const mysql=require('mysql2/promise');
const {logger}= require('./logger');
const {Util}= require('./util');

let pool= null;

async function connect(options) {
  return new Promise(async (resolve, reject) => {
    if(pool==null){
      try{
        pool = mysql.createPool(options);
        await pool.query("select 1");
        resolve();
      }catch (e) {
       logger.error("Unable to create pool "+e);
       reject(e);
      }
    }else{
      resolve();
    }
  });
}

async function disconnect() {
}

async function write(sql){
  await pool.execute(sql);
}
async function writeSafe(sql, values){
  await pool.execute(sql, values);
}
async function query(sql){
  const [rows]= await pool.execute(sql);
  return rows;
}

const stores={
  STATUS_DISABLED: 0,
  STATUS_ENABLED: 1,
  SQL_FIND_NAME_LIKE: "select id,name,slug from stores where status=1 and name like ? order by popularity desc limit 0,10",
  _getColumns: function(target) {
    let cols= [
      "s.*",
      "c.id as coupon_id",
      "c.name as coupon_name",
      "c.code as coupon_code",
      "c.startDate as coupon_startDate",
      "c.endDate as coupon_endDate",
      "c.status as coupon_status",
      "c.storeId as coupon_storeId",
      "c.storeName as coupon_storeName",
      "c.discountType as coupon_discountType",
      "c.discountValue as coupon_discountValue",
      "c.type as coupon_type",
      "c.details as coupon_details",
      "c.lastApplyDate as coupon_lastApplyDate",
      "truncate(c.lastApplyDiscount,2) as coupon_lastApplyDiscount",
      "c.description as coupon_description",
      "c.url as coupon_url"
    ];
    if(target==='affiliate'){
      cols.push("p.id as program_id","p.externalId as program_externalId","p.network as program_network","p.joined as program_joined","p.tracker as program_tracker");
    }
    return cols;
  },
  parseStoreFromRow: function(row){
    let description= [];
    const descriptionJson= row['description'];
    if(descriptionJson && descriptionJson!==''){
      try{
        description= JSON.parse(descriptionJson);
      }catch (e) {
        logger.error(e);
      }
    }
    let qa= [];
    const qaJson= row['qa'];
    if(qaJson && qaJson!==''){
      try{
        qa= JSON.parse(qaJson);
      }catch (e) {
        logger.error(e);
      }
    }
    return {
      id: row['id'],
      name: row['name'],
      slug: row['slug'],
      domain: row['domain'],
      url: row['url'],
      popularity: row['popularity'],
      description,
      qa,
      verticalId: row['verticalId']
    };
  },
  parseCouponFromRow: function(row){
    if(row['coupon_id']==null){
      return null;
    }
    return {
      id: row['coupon_id'],
      name: row['coupon_name'],
      code: row['coupon_code'],
      description: row['coupon_description'],
      details: row['coupon_details'],
      startDate: row['coupon_startDate'],
      endDate: row['coupon_endDate'],
      status: row['coupon_status'],
      type: row['coupon_type'],
      storeId: row['coupon_storeId'],
      discount: {
        type: row['coupon_discountType'],
        value: row['coupon_discountValue']
      },
      url: row['coupon_url'],
      lastApplyDate: row['coupon_lastApplyDate'],
      lastApplyDiscount: row['coupon_lastApplyDiscount']
    };
  },
  parseExtensionSettingsFromRow: function(row){
    if(row['extensionSettings']==null){
      return null;
    }
    return JSON.parse(row['extensionSettings']);
  },
  parseAffiliateProgramFromRow: function(row){
    if(row['program_id']==null){
      return null;
    }
    return {
      id: row['program_id'],
      externalId: row['program_externalId'],
      network: row['program_network'],
      joined: row['program_joined'],
      tracker: row['program_tracker']
    };
  },
  query: async function(fields, conditions=[], values=[]){
    let sql= "select "+fields.join(",")+" from stores";
    if(conditions.length>0){
      sql+= " where "+conditions.join(" and ");
    }
    const [rows, dbfields]= await pool.execute(sql, values);
    return rows;
  },
  getStoresForAdmin: async function() {
    let stores= [];
    const sql= "select s.id,s.name,c.status,count(c.id) as couponCount,s.extensionSettings " +
        "from stores s " +
        "left join coupons c on s.id=c.storeId and c.status<=2 " +
        "where s.status=1 "+
        "group by c.status,s.id order by s.id asc";
    const [rows, fields]= await pool.execute(sql);
    if(rows.length>0){
      let currentStore= {id: -1};
      for(const row of rows){
        if(row.id===currentStore.id){
          if(row.status===0){
            currentStore.draftCoupons= row.couponCount;
          }else if(row.status===1){
            currentStore.publishedCoupons= row.couponCount;
          }else if(row.status===2){
            currentStore.publishedNoNameCoupons= row.couponCount;
          }
          if(row.extensionSettings!=null){
            currentStore.hasExtensionSettings= true;
          }
        }else{
          stores.push(currentStore);
          currentStore= {
            id: row.id,
            name: row.name,
            draftCoupons: row.status===0?row.couponCount:0,
            publishedCoupons: row.status===1?row.couponCount:0,
            publishedNoNameCoupons: row.status===2?row.couponCount:0,
            hasExtensionSettings: row.extensionSettings != null
          };
        }
      }
      stores.splice(0, 1);
    }
    return stores;
  },
  getStoreForAdmin: async function(id) {
    let sql= "select "+this._getColumns().join(",")+" from stores s left join coupons c on s.id=c.storeId"+
      " and c.status<=2 where s.id= ?";
    const [rows, fields]= await pool.execute(sql, [id]);
    let store= null;
    if(rows.length>0){
      store= rows[0];
      store.xref= JSON.parse(store.xref);
      store.extensionSettings= this.parseExtensionSettingsFromRow(rows[0]);
      store.coupons= [];
      for(const row of rows){
        let coupon= this.parseCouponFromRow(row);
        if(coupon!=null){
          coupon.storeName= store.name;
          store.coupons.push(coupon);
        }
      }
    }
    return store;
  },
  updateExtensionSettings: async function(store, extension){
    const sql= "update stores set extensionSettings = ? where id = ?";
    try{
      await pool.execute(sql,[extension,store.id]);
    }catch (e) {
      logger.error(e);
      return false;
    }
    return true;
  },
  getLatestCoupons: async function() {
    const coupons= [];
    let sql= `select ${this._getColumns().join(",")} from coupons c join stores s on s.id=c.storeId
         where c.status=1 group by c.storeId order by s.popularity desc limit 0,50`;
    const [rows]= await pool.execute(sql);
    if(rows.length>0){
      for(const row of rows){
        let coupon= this.parseCouponFromRow(row);
        if(coupon!=null){
          coupon.storeName= row['name'];
          coupons.push(coupon);
        }
      }
    }
    return coupons;
  },
  getExpiredCoupons: async function(storeId, storeName){
    const expiredCoupons= [];
    const cols= [
      "c.id as coupon_id",
      "c.name as coupon_name",
      "c.code as coupon_code",
      "c.startDate as coupon_startDate",
      "c.endDate as coupon_endDate",
      "c.status as coupon_status",
      "c.storeId as coupon_storeId",
      "c.storeName as coupon_storeName",
      "c.discountType as coupon_discountType",
      "c.discountValue as coupon_discountValue",
      "c.type as coupon_type",
      "c.details as coupon_details",
      "c.lastApplyDate as coupon_lastApplyDate",
      "c.lastApplyDiscount as coupon_lastApplyDiscount",
      "c.description as coupon_description",
      "c.url as coupon_url"
    ];
    const sql= `select ${cols.join(",")} from coupons c where c.storeId=${storeId} and c.status in (3,4) and c.name!='' order by c.startDate desc limit 0,5`;
    const [rows]= await pool.execute(sql);
    for(const row of rows) {
      let coupon = this.parseCouponFromRow(row);
      if (coupon != null) {
        coupon.storeName = storeName;
        expiredCoupons.push(coupon);
      }
    }
    return expiredCoupons;
  },
  getTopStores: async function(verticalId, excludeStoreId, max=20){
    const sql= `select id,name,slug from stores where status=1 and verticalId=${verticalId} and id!=${excludeStoreId} order by popularity desc limit 0,${max}`;
    const [rows]= await pool.execute(sql);
    return rows;
  },
  //TODO refactor with fundBySlug
  findByIds: async function(ids, target='web') {
    let sql= "select "+this._getColumns(target).join(",")+" from stores s left join coupons c on s.id=c.storeId";
    if(target==='extension'){
      sql+= " and c.status in (1,2) and type='code'";
    }else{
      sql+= " and c.status=1";
    }
    if(target==='affiliate'){
      sql+= " left join programs p on p.id=s.programId";
    }
    sql+= " where s.id in ("+ids.join(',')+") order by s.id, c.startDate desc";
    const [rows]= await pool.execute(sql);
    const stores= [];
    let storeId=null;
    let store=null;
    for(const row of rows){
      if(row.id!==storeId){
        if(store!=null){
          stores.push(store);
        }
        storeId= row.id;
        store= this.parseStoreFromRow(row);
        if(target==='extension'){
          store.extensionSettings= this.parseExtensionSettingsFromRow(row);
        }else{
          delete store.extensionSettings;
        }
        if(target==='affiliate'){
          store.program= this.parseAffiliateProgramFromRow(row);
        }
        store.coupons= [];
      }
      let coupon= this.parseCouponFromRow(row);
      if(coupon!=null){
        coupon.storeName= store.name;
        store.coupons.push(coupon);
      }
    }
    if(target!=='extension'){
      for(const s of stores){
        s.expiredCoupons= await this.getExpiredCoupons(s.id, s.name);
        s.relatedStores= await this.getTopStores(s.verticalId, s.id);
      }
    }
    return stores;
  },
  findByKey: async function (key, value, target = 'web') {
    let sql= "select "+this._getColumns(target).join(",")+" from stores s left join coupons c on s.id=c.storeId";
    if(target==='extension'){
      sql+= " and c.status in (1,2) and type='code'";
    }else{
      sql+= " and c.status=1";
    }
    if(target==='affiliate'){
      sql+= " left join programs p on p.id=s.programId";
    }
    sql+= " where s."+key+" = ? order by c.startDate desc";
    const [rows]= await pool.execute(sql, [value]);
    let store= null;
    if(rows.length>0){
      store= this.parseStoreFromRow(rows[0]);
      if(target==='extension'){
        store.extensionSettings= this.parseExtensionSettingsFromRow(rows[0]);
      }else{
        delete store.extensionSettings;
      }
      if(target==='affiliate'){
        store.program= this.parseAffiliateProgramFromRow(rows[0]);
      }
      store.coupons= [];
      for(const row of rows){
        let coupon= this.parseCouponFromRow(row);
        if(coupon!=null){
          coupon.storeName= store.name;
          store.coupons.push(coupon);
        }
      }
      store.expiredCoupons= await this.getExpiredCoupons(store.id, store.name);
      store.relatedStores= await this.getTopStores(store.verticalId, store.id);
    }
    return store;
  },
  list: async function(cols) {
    const sql= "select "+cols.join(',')+" from stores where status="+this.STATUS_ENABLED;
    const [rows]= await pool.execute(sql);
    return rows;
  },
/*
  findNameLike: async function(name) {
    const [rows, fields]= await pool.execute(this.SQL_FIND_NAME_LIKE, [name+'%']);
    return rows;
  },
*/
};

const coupons= {
  STATUS_DRAFT: 0,
  STATUS_PUBLISHED: 1,
  STATUS_PUBLISHED_NONAME: 2,
  STATUS_EXPIRED: 3,
  STATUS_REMOVED: 4,
  cols: ['name','description','details','url','code','manual','startDate','endDate','storeId','storeName','status','discountType','discountValue','type','creationDate','lastHeartbeat','storeHeartbeat','xref'],
  findActiveCoupons: async function(storeId){
    const coupons= [];
    const sql= "select * from coupons where storeId="+storeId+" and status<=2";
    const [rows]= await pool.execute(sql);
    for(const row of rows){
      row.xref= JSON.parse(row.xref);
      row.discount= {type: row.discountType, value: row.discountValue};
      coupons.push(row);
    }
    return coupons;
  },
  adminUpdate: async function(coupon){
    const cols= ["name","description","url","details","code","discountType","discountValue","type","startDate","endDate"];
    const sql= "update coupons set "+
        cols.map(
            (col) => {
              return col+' = ?';
            }
        ).join(',')+
        " where id="+coupon.id;
    await pool.execute(sql,
        cols.map(
            key => {
              if(key==='discountType'){
                return coupon.discount.type;
              }else if(key==='discountValue'){
                return coupon.discount.value;
              }
              return coupon[key]
            }
        )
    );
    if(coupon.name!=="" && coupon.status===this.STATUS_PUBLISHED_NONAME){
      await pool.execute("update coupons set status="+this.STATUS_PUBLISHED+" where id="+coupon.id);
    }

  },
  create: async function(coupon){
    const sql= "insert into coupons("+this.cols.join(',')+") values("+this.cols.map(value => {return '?'})+")";
    const [rs,err]= await pool.execute(sql,
        this.cols.map(
            key => {
              if(key==='discountType'){
                return coupon.discount.type;
              }else if(key==='discountValue'){
                return coupon.discount.value;
              }else if(key==='xref'){
                return JSON.stringify(coupon.xref)
              }
              return coupon[key]
            }
            )
    );
    if(!err){
      return rs.insertId;
    }
    return null;
  },
  update: async function(coupon){
    const sql= "update coupons set "+
        this.cols.map(
            (col) => {
              return col+' = ?';
            }
            ).join(',')+
        " where id="+coupon.id;
    await pool.execute(sql,
        this.cols.map(
            key => {
              if(key==='discountType'){
                return coupon.discount.type;
              }else if(key==='discountValue'){
                return coupon.discount.value;
              }else if(key==='xref'){
                return JSON.stringify(coupon.xref)
              }
              return coupon[key]
            }
        )
    );
  }
};
const clients= {
  cols: ['id','type','creationDate','lastHeartbeat'],
  SUBSCRIPTION_STATUS_TO_SUBSCRIBE: 0,
  SUBSCRIPTION_STATUS_SUBSCRIBED: 1,
  SUBSCRIPTION_STATUS_TO_UNSUBSCRIBE: 2,
  SUBSCRIPTION_STATUS_UNSUBSCRIBED: 3,
  SUBSCRIPTION_STATUS_FAILED_UNSUBSCRIBE: 4,
  SUBSCRIPTION_STATUS_FAILED_SUBSCRIBE: 5,
  create: async function(client){
    const now= Util.getTimestamp();
    client.creationDate= now;
    client.lastHeartbeat= now;
    if(!client.type){
      client.type= 'unknown';
    }
    const sql= "insert into clients("+this.cols.join(',')+") values("+this.cols.map(value => {return '?'})+")";
    await pool.execute(sql,
        this.cols.map(
            key => {
              return client[key]
            }
        )
    );
  },
  updateNotificationSettings: async function(clientId,token,enabled){
    let sql= "update clients set ";
    const poolExecParams= [];
    if(token!==undefined){
      sql+= "notificationToken = ? ";
      poolExecParams.push(token);
      if(enabled!==undefined){
        sql+= ", notificationEnabled = ? ";
        poolExecParams.push(enabled);
      }
    }else{
      sql+= "notificationEnabled = ? ";
      poolExecParams.push(enabled);
    }
    sql+= " where id = ?";
    poolExecParams.push(clientId);
    await pool.execute(sql,poolExecParams);
  },
  findById: async function(id){
    let client= null;
    const sql= "select * from clients where id = ?";
    const [rows]= await pool.execute(sql,[id]);
    if(rows.length===1){
      client= rows[0];
    }
    return client;
  },
  getFavedCoupons: async function(clientId){
    let coupons= [];
    let cols= [
      "s.name as store_name",
      "c.id as coupon_id",
      "c.name as coupon_name",
      "c.code as coupon_code",
      "c.startDate as coupon_startDate",
      "c.endDate as coupon_endDate",
      "c.status as coupon_status",
      "c.description as coupon_description",
      "c.discountType as coupon_discountType",
      "c.discountValue as coupon_discountValue",
      "c.type as coupon_type",
      "c.storeId as coupon_storeId"
    ];
    let sql= "select "+cols.join(",")+
        " from stores s join coupons c on s.id=c.storeId and c.status=1" +
        " join clients_favedstores cf on cf.clientId= ? and s.id=cf.storeId"+
        " where c.status=1"+
        " order by c.creationDate desc";
    const [rows, fields]= await pool.execute(sql, [clientId]);
    if(rows.length>0){
      for(const row of rows){
        let coupon= {
          id: row['coupon_id'],
          name: row['coupon_name'],
          code: row['coupon_code'],
          storeName: row['store_name'],
          storeId: row['coupon_storeId'],
          description: row['coupon_description'],
          startDate: row['coupon_startDate'],
          endDate: row['coupon_endDate'],
          status: row['coupon_status'],
          type: row['coupon_type'],
          discount: {
            type: row['coupon_discountType'],
            value: row['coupon_discountValue']
          }
        };
        coupons.push(coupon);
      }
    }
    return coupons;
  },
  getFavedStoreIds: async function(clientId){
    let sql= "select storeId from clients_favedstores where clientId = ?";
    const [rows]= await pool.execute(sql, [clientId]);
    return rows.map(row => {return row.storeId});
  },
  removeFavedStores: async function(clientId,storeIds){
    const sql= "delete from clients_favedstores where clientId = ? and storeId in ("+storeIds.join(',')+")";
    await pool.execute(sql, [clientId]);
  },
  addFavedStores: async function(clientId,storeIds){
    const faveIds=[];
    for(const sId of storeIds){
      faveIds.push(clientId);
      faveIds.push(sId);
    }
    let sql= "insert into clients_favedstores(clientId,storeId) values "+
        storeIds.map(
            () => {
              return "( ? , ?)";
            }
        );
    await pool.execute(sql,faveIds);
    sql= `update stores set popularity=popularity+1 where id in (${storeIds.join(',')})`;
    pool.execute(sql);
  },
  createSaving: async function(saving){
    const cols= ['clientId','storeId','couponId','total','discount','orderDate'];
    let sql= "insert into savings("+cols.join(',')+") values("+cols.map(value => {return '?'})+")";
    const [rs,err]= await pool.execute(sql,
        cols.map(
            key => {
              return saving[key]
            }
        )
    );
    sql= `update coupons set lastApplyDate=${saving.orderDate}, lastApplyDiscount=${saving.discount} where id=${saving.couponId}`;
    await pool.execute(sql);
    if(!err){
      return rs.insertId;
    }
    return "";
  },
  subscribeToStores: async function(clientId, storeIds){
    const faveIds=[];
    for(const sId of storeIds){
      faveIds.push(clientId);
      faveIds.push(sId);
    }
    const sql= "replace into clients_subscriptions(clientId,storeId,status) values "+
        storeIds.map(
            () => {
              return "(? , ?, "+this.SUBSCRIPTION_STATUS_TO_SUBSCRIBE+" )";
            }
        );
    await pool.execute(sql,faveIds);
  },
  unsubscribeFromStores: async function(clientId, storeIds){
    const faveIds=[];
    for(const sId of storeIds){
      faveIds.push(clientId);
      faveIds.push(sId);
    }
    const sql= "replace into clients_subscriptions(clientId,storeId,status) values "+
        storeIds.map(
            () => {
              return "(?, ?, "+this.SUBSCRIPTION_STATUS_TO_UNSUBSCRIBE+" )";
            }
        );
    await pool.execute(sql,faveIds);
  }
};
const shoptrips= {
  cols: ['id','clientId','storeId','tripDate'],
  create: async function(trip){
    const sql= "insert into shoptrips("+this.cols.join(',')+") values("+this.cols.map(value => {return '?'})+")";
    await pool.execute(sql,
        this.cols.map(
            key => {
              return trip[key]
            }
        )
    );
  },
};

exports.connect=connect;
exports.disconnect=disconnect;
exports.write=write;
exports.writeSafe=writeSafe;
exports.query=query;
exports.stores=stores;
exports.coupons= coupons;
exports.clients= clients;
exports.shoptrips= shoptrips;
