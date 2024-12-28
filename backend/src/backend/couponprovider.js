const request= require('request');
const {config}= require('../common/config');
const {logger}= require('../common/logger');

class CouponProvider{
  constructor(options){
    if(! 'name' in options){
      Error("CouponProvider::constructor: name is mandatory");
    }
    this.name= options.name;
    this.enabled= true;
    this.multiStore= false;
    this.isNetwork= false;
    if('multiStore' in options){
      this.multiStore= options.multiStore;
    }
    if('isNetwork' in options){
      this.isNetwork= true;
    }
  }
  isMultiStore(){
    return this.multiStore;
  }
  hasUgc(){
    return false;
  }
  importCoupons(store){
    return new Promise((resolve, reject) => {
      const req= this.getRequest(store);
      if(req!=null){
        if(req.proxify){
          req.url= `http://api.proxycrawl.com/?token=${config.proxyCrawlToken}&url=${encodeURIComponent(req.url)}`;
        }
        logger.debug("Running : "+req.url);
        request(req, async (error, response, data) => {
          if (error != null) {
            logger.error("Failed : "+req.url+ " - Error="+error);
            reject(error.message);
            return;
          }
          if(response.statusCode!==200){
            logger.error("Failed : "+req.url+ " - Code="+error);
            reject(`HTTP ${response.statusCode} error`);
            return;
          }
          logger.debug("Done : "+req.url);
          //TODO check response format is ok otherwise reject the promise
          try{
            const coupons= this.parseCoupons(response.statusCode, data);
            for(const coupon of coupons){
              coupon.storeId= store.id;
              coupon.storeName= store.name;
              coupon.store= {name: store.name, domain: store.domain};
            }
            resolve(coupons);
          }catch (err) {
            logger.error(`responseCode=${response.statusCode}\nData=${data}`);
            //maybe response format has changed
            reject(`${err.message}\nStore: ${store.name}\nUrl: ${req.url}`);
          }
        });
      }
    });
  }
  /*
    Following methods to be implemented
    by providers
   */
  parseCoupons(statusCode, data){
    return [];
  }
  getRequest(store){
    return null;
  }
}

exports.CouponProvider= CouponProvider;
