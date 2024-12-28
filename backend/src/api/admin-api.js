const db= require('../common/db');
const Util= require('../common/util').Util;
const adminApi = require('../common/app').app;
const {config}= require('../common/config');
const cache= require('../common/cache');

/*
adminApi.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/
adminApi.get('/', function (req, res) {
  res.send('hello world');
});
adminApi.get('/admin/api/providers', async (req,res) => {
  const stores= await db.stores.getStoresForAdmin();
  res.json(stores);
});
adminApi.get('/admin/api/stores', async (req,res) => {
  const stores= await db.stores.getStoresForAdmin();
  res.json(stores);
});
adminApi.get('/admin/api/stores/:id', async (req,res) => {
  const store= await db.stores.getStoreForAdmin(req.params.id);
  res.json(store);
});
adminApi.post('/admin/api/coupons', async (req,res) => {
  const nowSec= Math.floor(Date.now()/1000);
  const coupon= req.body;
  console.log(coupon);
  if(!coupon.url || coupon.url===''){
    coupon.url= null;
  }
  if(coupon.id===0){
    coupon.status= 0;
    coupon.xref= [];
    coupon.creationDate= nowSec;
    coupon.lastHeartbeat= nowSec;
    coupon.storeHeartbeat= nowSec;
    await db.coupons.create(coupon);
  }else{
    await db.coupons.adminUpdate(coupon);
  }
  cache.setStoreById(coupon.storeId);
  res.end();
});
adminApi.post('/admin/api/publish-coupons', async (req,res) => {
  const data= req.body;
  const store= data.store;
  const couponIds= data.couponIds;
  const notify= data.notify;
  await db.write("update coupons set status=1 where id in ("+couponIds.join(',')+")");
  cache.setStoreBySlug(store.slug);
  if(notify){
    const dbStore= await db.stores.findByKey('slug',store.slug);
    const notifCoupons= [];
    for(const c of dbStore.coupons){
      for(const cId of couponIds){
        if(cId===c.id){
          notifCoupons.push(c);
          break;
        }
      }
    }
    if(notifCoupons.length>0){
      Util.sendCouponsAlert(store.slug, notifCoupons);
    }
  }
  res.end();
});
adminApi.post('/admin/api/stores/:id/extension', async (req,res) => {
  const data= req.body;
  const store= data.store;
  const extension= data.extension;
  await db.stores.updateExtensionSettings(store, extension);
  cache.setStoreBySlug(store.slug);
  res.end();
});

adminApi.post('/admin/api/stores/:id/update-cache', async (req,res) => {
  const store= req.body;
  cache.setStoreBySlug(store.slug);
  res.end();
});

adminApi.listen(config.adminApiPort,
    async () => {
      await db.connect(config.db);
      await cache.initialize(config.cache);
      console.log(`Listening on port ${config.adminApiPort}!`);
    });