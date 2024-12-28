//Aborted till i verify that it is worth the effort (available offers seem limited)
const CouponProvider= require('../couponprovider').CouponProvider;
const Coupon= require('../coupon').Coupon;
const Util= require('../../common/util').Util;

class SkimlinksOffersAPI extends CouponProvider{

  constructor(){
    super({_name: SkimlinksOffersAPI._name});
  }

  parseCoupons(statusCode, data){
    const coupons= [];
    const result = JSON.parse(data);
    for(const rawCoupon of result){
      Util.assertFieldInObject("SuccessRate", rawCoupon, "rawCoupon",Cently.ERROR_TAG);
      Util.assertFieldInObject("LastSuccessDate", rawCoupon, "rawCoupon",Cently.ERROR_TAG);
      Util.assertFieldInObject("Code", rawCoupon, "rawCoupon",Cently.ERROR_TAG);
      if(rawCoupon.SuccessRate<50){
        continue;
      }
      const startDate = Util.getTimestamp();
      const lastHeartbeat = Util.getTimestamp(rawCoupon.LastSuccessDate);
      let endDate= 0;
      let coupon= new Coupon({
        name: "",
        code: rawCoupon.Code,
        endDate : endDate,
        startDate : startDate,
        lastHeartbeat : lastHeartbeat
      });
      coupons.push(coupon);
    }
    return coupons;
  }
  getRequest(store){
    const request= {
      url: '*******************************',
      method: 'GET',
      proxify: true
    };
    request.url= request.url.replace('DOMAIN', store.domain);
    return request;
  }
}
SkimlinksOffersAPI._name= 'skimlinks';
SkimlinksOffersAPI.ERROR_TAG= "error-skimlinks";

exports.SkimlinksOffersAPI= SkimlinksOffersAPI;
