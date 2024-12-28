const db= require('../common/db');
const cache= require('../common/cache');
const {logger}= require('./logger');

async function getStoreBySlug(slug, target){
  if(!slug || slug===''){
    return null;
  }
  if(!target){
    target= 'web';
  }
  let store= await cache.getStoreBySlug(slug, target);
  if(!store) {
    logger.info("getStoreBySlug: Nothing from cache");
    store= await db.stores.findByKey('slug', slug, target);
  }
  if(store && target!=='extension'){
    delete store.extensionSettings;
  }
  return store;
}
async function getStoreById(storeId){
  let store= await cache.getStoreById(storeId);
  if(!store){
    store= await db.stores.findByKey('id', storeId, 'affiliate');
  }
  return store;
}
/*
async function findStoresLikeName(name){
  const query= name.toLowerCase();
  let stores= await cache.findStoresLikeName(query);
  if(!stores){
    logger.info("findStoresLikeName: Nothing from cache");
    stores= await db.stores.findNameLike(query);
  }
  return stores;
}
 */
function getLatestCoupons(target){

}

//exports.findStoresLikeName= findStoresLikeName;
exports.getStoreBySlug= getStoreBySlug;
exports.getStoreById= getStoreById;
