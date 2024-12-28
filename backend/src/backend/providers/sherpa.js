const CouponProvider= require('../couponprovider').CouponProvider;
const Coupon= require('../coupon').Coupon;
const Util= require('../../common/util').Util;

class Sherpa extends CouponProvider{

  constructor(){
    super({_name: Sherpa._name});
  }

  parseCoupons(statusCode, data){
    const coupons= [];
    const result = JSON.parse(data);
    Util.assertFieldInObject("offers", result, "result",Sherpa.ERROR_TAG);
    for(const rawCoupon of result.offers){
      Util.assertFieldInObject("date_end", rawCoupon, "rawCoupon",Sherpa.ERROR_TAG);
      Util.assertFieldInObject("offer", rawCoupon, "rawCoupon",Sherpa.ERROR_TAG);
      Util.assertFieldInObject("code", rawCoupon, "rawCoupon",Sherpa.ERROR_TAG);
      const startDate = Util.getTimestamp();
      let endDate= 0;
      if(rawCoupon.date_end!==""){
        endDate = Util.getTimestamp(rawCoupon.date_end);
      }
      let coupon= new Coupon({
        name: Coupon.cleanupName(rawCoupon.offer),
        code: rawCoupon.code,
        endDate : endDate,
        startDate : startDate
      });
      coupons.push(coupon);
    }
    return coupons;
  }
  getRequest(store){
    const request= {
      url: '***************************',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'User-Agent': 'Apache-HttpClient/UNAVAILABLE (java 1.4)'
      },
      proxify: true
    };
    request.url+= "&merchant_id="+store.xref.sherpa;
    return request;
  }
}
Sherpa._name= 'sherpa';
Sherpa.ERROR_TAG= 'error-sherpa';

exports.Sherpa= Sherpa;
