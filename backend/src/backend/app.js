const Cently= require('./providers/cently').Cently;
const Honey= require('./providers/honey').Honey;
const RMN= require('./providers/rmn').RMN;
const Sherpa= require('./providers/sherpa').Sherpa;
const db= require('../common/db');
const cache= require('../common/cache');
const Coupon= require('./coupon').Coupon;
const Util= require('../common/util').Util;
const {config}= require('../common/config');
const shuffle = require('shuffle-array');
const {logger,sendAppAlert} = require('../common/logger');

const app= {
  providers: {
    "cently" : new Cently(),
    "honey" : new Honey(),
    "rmn" : new RMN(),
    "sherpa" : new Sherpa()
  },
  providersErrorCount: {},
  providerMaxErrorBeforeDisable: 50,
  mergeProvidersCoupons: function(providerName, providerCoupons, allProvidersCoupons){
    for(const coupon of providerCoupons){
      //merge coupons having same code
      //and fill missing information if any
      let existingCoupon= allProvidersCoupons[coupon.code];
      if(existingCoupon==null){
        coupon.xref= [providerName];
        allProvidersCoupons[coupon.code]= coupon;
        continue;
      }
      if(! (existingCoupon.xref.includes(providerName))){
        existingCoupon.xref.push(providerName);
      }
      if(existingCoupon.endDate===0 && coupon.endDate>0){
        existingCoupon.endDate= coupon.endDate;
      }
      if(existingCoupon.name===''){
        existingCoupon.name= coupon.name;
      }
    }
  },
  createImportTask: function(todo){
    let progress= {stores: {todo: todo, done: 0, lastId: 0}, coupons: {new: 0, old: 0}};
    return {startDate: Util.getTimestamp(), progress: progress, status: 0};
  },
  run: async function(){
    config.currentApp= "backend";
    await db.connect(config.db);
    await cache.initialize(config.cache);
    await Util.sleep(3);
    app.importCoupons();
    app.cleanupCoupons();
    app.processPushSubscriptions();
    app.monitorCache();
  },
  importCoupons: async function (){
    const storeListSql= "select id,name,slug,domain,xref from stores where automated=1 and status=1 order by popularity desc";
    let stores= await db.query(storeListSql);
    const taskListSql= "select * from import_tasks where status=0";
    const tasks= await db.query(taskListSql);
    let currentTask= this.createImportTask(stores.length);
    let resume= false;
    if(tasks.length>0){
      let currentTaskDB= tasks[0];
      const startDate= currentTaskDB.startDate;
      if(Util.getTimestamp()-startDate < config.backend.importRunIntervalMin){
        resume= true;
        currentTask= currentTaskDB;
        currentTask.progress= JSON.parse(currentTaskDB.progress);
        const lastProcessedStoreId= currentTask.progress.stores.lastId;
        let lastStoreIndex= 0;
        for(const store of stores){
          if(store.id===lastProcessedStoreId){
            lastStoreIndex++;
            break;
          }
          lastStoreIndex++;
        }
        stores= stores.slice(lastStoreIndex);
      }else{
        await db.write(`update import_tasks set status=2 where startDate=${currentTaskDB.startDate}`);
      }
    }
    while(true){
      if(! resume){
        for(const providerName of Object.keys(this.providers)){
          this.providersErrorCount[providerName]= 0;
        }
        logger.debug("Starting a new import task");
        await db.write(`insert into import_tasks(startDate,progress) values(${currentTask.startDate},'${JSON.stringify(currentTask.progress)}')`);
      }else{
        logger.debug("Resuming previous import task, starting with "+stores[0].name);
      }
      let storeIndex= 0;
      for(const store of stores){
        storeIndex++;
        let allProvidersCoupons= {};
        let providerSuccess= 0;
        let existingCouponList= await db.coupons.findActiveCoupons(store.id);
        let existingCoupons= {};
        for(const c of existingCouponList){
          existingCoupons[c.code]= new Coupon(c);
        }
        store.xref= JSON.parse(store.xref);
        for(const providerName of shuffle(Object.keys(store.xref), {copy: true})){
          if(store.xref[providerName]===0){
            continue;
          }
          let provider= this.providers[providerName];
          if(provider==null){
            continue;
          }
          if(!provider.enabled){
            continue;
          }
          let providerCoupons=null ;
          try{
            providerCoupons= await provider.importCoupons(store);
            providerSuccess++;
            this.mergeProvidersCoupons(providerName, providerCoupons, allProvidersCoupons);
            await Util.sleep(config.backend.importWaitBetweenProviders);
          }catch (e) {
            logger.crit(`[${providerName}] Error importing coupons`, e);
            this.providersErrorCount[providerName]++;
            if(this.providersErrorCount[providerName]>=this.providerMaxErrorBeforeDisable){
              provider.enabled= false;
              logger.crit(`[${providerName}] Provider disabled`, "Provider has been disabled after "+this.providerMaxErrorBeforeDisable+" errors");
            }
          }
        }
        const now = Util.getTimestamp();
        const notifCoupons= [];
        for(const code of Object.keys(allProvidersCoupons)){
          let coupon= allProvidersCoupons[code];
          if(coupon.isExpired() || coupon.isGarbage()){
            continue;
          }
          if(coupon.xref.length===1){
            continue;
/*
            let p= this.providers[coupon.xref[0]];
            if(p.hasUgc()){
              //ignore coupons coming from only one provider that potentially has garbage data
              continue;
            }
*/
          }
          let existingCoupon= existingCoupons[code];
          await coupon.save(existingCoupon, now);
          if(existingCoupon){
            currentTask.progress.coupons.old++;
          }else{
            currentTask.progress.coupons.new++;
          }
          if(!existingCoupon && coupon.id && coupon.status===Coupon.STATUS_PUBLISHED){
            const rows= await db.query(`select clientId from clients_favedstores where storeId = ${store.id} limit 0,1`);
            if(rows.length>0){
              notifCoupons.push(coupon);
            }
          }
        }
        if(providerSuccess>0){
          //at least one provider crawl succeeded
          await db.write(`update coupons set storeHeartbeat=${now} where storeId=${store.id}`);
        }
        await cache.setStoreBySlug(store.slug);
        if(notifCoupons.length>0){
          Util.sendCouponsAlert(store, notifCoupons);
        }
        currentTask.progress.stores.todo--;
        currentTask.progress.stores.done++;
        currentTask.progress.stores.lastId= store.id;
        await db.write(`update import_tasks set progress='${JSON.stringify(currentTask.progress)}' where startDate=${currentTask.startDate}`);
        const nextStoreDelay= Util.getRandomNumber(config.backend.importWaitBetweenStoresMin, config.backend.importWaitBetweenStoresMax);
        logger.debug(`[importCoupons] Next store in ${nextStoreDelay} seconds`);
        if(storeIndex % config.backend.logImportProgressEveryStoreCount === 0){
          logger.info(`[ImportCoupons] stores todo/done : ${currentTask.progress.stores.todo}/${currentTask.progress.stores.done} , coupons new/old : ${currentTask.progress.coupons.new}/${currentTask.progress.coupons.old}`);
        }
        await Util.sleep(nextStoreDelay);
      }
      await db.write(`update import_tasks set status=1, endDate=${Util.getTimestamp()} where startDate=${currentTask.startDate}`);
      const nextImportDelay= Util.getRandomNumber(config.backend.importRunIntervalMin,config.backend.importRunIntervalMax);
      logger.debug(`[importCoupons] Next import batch in ${nextImportDelay} seconds`);
      sendAppAlert("Coupon import task finished", JSON.stringify(currentTask));
      await Util.sleep(nextImportDelay);
      resume= false;
      stores= await db.query(storeListSql);
      currentTask= this.createImportTask(stores.length);
    }
  },
  setExpiredCoupons: async function (){
    logger.debug("Setting expired coupons");
    const now = Util.getTimestamp()-86400;
    const rows= await db.query(`select distinct storeId from coupons where status in(1,2) and endDate>0 and endDate<${now}`);
    if(rows.length===0){
      return;
    }
    await db.write(`update coupons set status=${Coupon.STATUS_EXPIRED} where status in (1,2) and endDate>0 and endDate<${now}`);
    for(const row of rows){
      await cache.setStoreById(row['storeId']);
    }
  },
  setRemovedCoupons: async function (){
    logger.debug("Setting removed coupons");
    const condition= `manual=0 and status in (1,2) and lastHeartbeat<storeHeartbeat`;
    const rows= await db.query(`select distinct storeId from coupons where ${condition}`);
    if(rows.length===0){
      return;
    }
    await db.write(`update coupons set status=${Coupon.STATUS_REMOVED} where ${condition}`);
    for(const row of rows){
      await cache.setStoreById(row['storeId']);
    }
  },
  processPushSubscriptions: async function (){
    while(true){
      for(const operation of ['unsubscribe','subscribe']){
        logger.debug("Getting tokens to "+operation);
        let statusTodo= db.clients.SUBSCRIPTION_STATUS_TO_SUBSCRIBE;
        let statusSuccess= db.clients.SUBSCRIPTION_STATUS_SUBSCRIBED;
        let statusFailed= db.clients.SUBSCRIPTION_STATUS_FAILED_SUBSCRIBE;
        if(operation==='unsubscribe'){
          statusTodo= db.clients.SUBSCRIPTION_STATUS_TO_UNSUBSCRIBE;
          statusSuccess= db.clients.SUBSCRIPTION_STATUS_UNSUBSCRIBED;
          statusFailed= db.clients.SUBSCRIPTION_STATUS_FAILED_UNSUBSCRIBE;
        }
        let sql= "select cs.clientId,cs.storeId,notificationToken,slug from clients c join clients_subscriptions cs on c.id=cs.clientId join stores s on s.id=cs.storeId"+
            " where cs.status=" +statusTodo;
        const rows= await db.query(sql);
        if(rows.length===0){
          continue;
        }
        const tokensToHandle= {};
        for(const row of rows){
          let slug= row['slug'];
          if(!(slug in tokensToHandle)){
            tokensToHandle[slug]= [];
          }
          tokensToHandle[slug].push({clientId: row['clientId'], storeId: row['storeId'], token: row['notificationToken']});
        }
        for(const slug of Object.keys(tokensToHandle)){
          let topic= `${slug}-promotions`;
          logger.debug("Doing "+operation+" "+tokensToHandle[slug].length+" tokens from "+topic);
          Util.toggleFcmSubscription(
              operation==='subscribe',
              tokensToHandle[slug],
              topic,
              async ()=>{
                logger.debug("Successfully did "+operation+" all tokens");
                for(const {clientId,storeId} of tokensToHandle[slug]){
                  let sql= "update clients_subscriptions set status="+statusSuccess+
                      " where clientId='"+clientId+"' and storeId="+storeId;
                  await db.write(sql);
                }
              },
              (error)=>{
                logger.error("Failed to "+operation+" any tokens : "+error);
              },
              async (failedTokens)=>{
                logger.error("Failed to "+operation+" some tokens");
                for(const {clientId,storeId} of failedTokens){
                  let sql= "update clients_subscriptions set status="+statusFailed+
                      " where clientId='"+clientId+"' and storeId="+storeId;
                  await db.write(sql);
                }
              });
          await Util.sleep(config.backend.processPushSubscriptionsTick);
        }
      }
      await Util.sleep(config.backend.processPushSubscriptionsInterval);
    }
  },
  cleanupCoupons: async function(){
    while(true){
      await app.setExpiredCoupons();
      await app.setRemovedCoupons();
      await Util.sleep(config.backend.cleanupInterval);
    }
  },
  monitorCache: async function(){
    while(true){
      logger.debug("[monitorCache] Checking cache status");
      let [redisReady, cacheReady]= await cache.getStatus();
      app.logCacheStatus(redisReady, cacheReady);
      if(redisReady && !cacheReady){
        await cache.populate();
      }
      await Util.sleep(config.backend.cacheMonitorInterval);
    }
  },
  logCacheStatus(redisReady, cacheReady){
    if(!redisReady){
      logger.debug("[monitorCache] Redis is not ready");
    }else{
      logger.debug("[monitorCache] Redis is ready");
    }
    if(!cacheReady){
      logger.debug("[monitorCache] Cache is not ready");
    }else{
      logger.debug("[monitorCache] Cache is ready");
    }
  }
};

module.exports= app;
