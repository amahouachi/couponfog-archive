const Redis= require('ioredis');
const db= require('./db');
const {logger}= require('./logger');
const {Util}= require('./util');

let redis;
let CACHE_READ_TIMEOUT= 50;
const CACHE_READY_KEY= "CACHE_READY";

// return [redisReady, cacheReady]
async function getStatus(){
  if(!redis){
    return [false];
  }
  try{
    const cacheReady= await Util.timeout(redis.get(CACHE_READY_KEY),CACHE_READ_TIMEOUT);
    if(!cacheReady){
      return [true,false];
    }
    return [true,cacheReady];
  }catch (e) {
    return [false];
  }
}
async function isReady(){
  const [redisStatus, cacheStatus]= await getStatus();
  return redisStatus && cacheStatus;
}

async function populate(){
  if(!redis){
    logger.error("Cache is not initialized");
    return;
  }
  logger.info("Started Populate cache");
  //await redis.flushdb();
  await redis.set(CACHE_READY_KEY, false);
  const stores=await db.stores.list(["id"]);
  for(const target of ['web','extension','affiliate']){
    let i=0;
    while(true){
      const ids= [];
      let j= i;
      while(j<stores.length && j<i+100){
        ids.push(stores[j].id);
        j++;
      }
      if(ids.length===0){
        break;
      }
      let storesWithCoupons= await db.stores.findByIds(ids, target);
      let pipeline= redis.pipeline();
      for(const s of storesWithCoupons){
        let popularity= ""+s.popularity;
        if(target==='affiliate'){
          pipeline.set("store:"+s.id, JSON.stringify(s));
        }else{
          pipeline.set("store:"+target+":"+s.slug, JSON.stringify(s));
        }
        //pipeline.zadd('index.stores.autocomplete', 0, s.name.toLowerCase()+":"+popularity.padStart(10,'0')+":"+s.name+":"+s.slug+":"+s.id);
      }
      try{
        await pipeline.exec();
      }catch (e) {
        logger.error(e);
      }
      i= i+100;
      if(j===stores.length-1){
        break;
      }
    }
  }
  await redis.set(CACHE_READY_KEY, true);
  logger.info("Finished Populate cache");
}

async function initialize(options){
  if(!redis){
    redis= new Redis(options);
    if(Util.isInteger(options.readTimeout)){
      CACHE_READ_TIMEOUT= options.readTimeout;
    }
    redis.on('error', function(e){
      logger.error(e);
      //console.log("Error occured : "+e);
    });
    redis.on('close', function(e){
      //logger.info(e);
      //console.log("Error occured : "+e);
    });
    redis.on('ready', async function(){
      logger.info("Redis is ready");
    });
  }
}
async function setStoreById(id){
  if(! await isReady()) return;
  try{
    const rows= await db.query("select slug from stores where id="+id);
    await setStoreBySlug(rows[0].slug);
  }catch (e) {
    logger.error(e);
  }
}
async function setStoreBySlug(slug){
  if(! await isReady()) return;
  try{
    await redis.set("store:web:"+slug, JSON.stringify(await db.stores.findByKey('slug', slug, "web")));
    await redis.set("store:extension:"+slug, JSON.stringify(await db.stores.findByKey('slug', slug, "extension")));
    const storeWithAffiliateProgram= await db.stores.findByKey('slug', slug, "affiliate");
    await redis.set("store:"+storeWithAffiliateProgram.id, JSON.stringify(storeWithAffiliateProgram));
  }catch (e) {
    logger.error(e);
  }
}
async function getStoreBySlug(slug, target){
  try{
    return JSON.parse(await Util.timeout(redis.get("store:"+target+":"+slug),CACHE_READ_TIMEOUT));
  }catch (e) {
    logger.debug(e);
    return null;
  }
}
async function getStoreById(id){
  try{
    return JSON.parse(await Util.timeout(redis.get("store:"+id),CACHE_READ_TIMEOUT));
  }catch (e) {
    logger.debug(e);
    return null;
  }
}
/*
// Commented because searching stores by name for autocomplete
// is now implemented on each client side
async function findStoresLikeName(name){
  if(!ready) return null;
  try{
    const MAX_RESULTS= 6;
    const stores= [];
    const results= await redis.zrangebylex("index.stores.autocomplete","["+name, "["+name+"z");
    for(const result of results){
      let fields= result.split(":");
      stores.push({
        popularity: parseInt(fields[1]),
        name: fields[2],
        slug: fields[3],
        id: fields[4]
      });
    }
    let max= 0;
    for(let i=0; i < MAX_RESULTS; i++){
      max = i;
      for (let j=i+1; j < stores.length; j++){
        if (stores[j]['popularity'] > stores[max]['popularity']){
          max = j;
        }
      }
      if (i !== max){
        let tmpStore= stores[i];
        stores[i] = stores[max];
        stores[max] = tmpStore;
      }
    }
    return stores.slice(0, MAX_RESULTS).map(store => {return {id: store.id, name: store.name, slug: store.slug}});
  }catch (e) {
    logger.error(e);
    return null;
  }
}
*/

exports.initialize= initialize;
exports.getStatus= getStatus;
exports.getStoreBySlug= getStoreBySlug;
exports.setStoreBySlug= setStoreBySlug;
exports.getStoreById= getStoreById;
exports.setStoreById= setStoreById;
exports.populate= populate;
//exports.findStoresLikeName= findStoresLikeName;
