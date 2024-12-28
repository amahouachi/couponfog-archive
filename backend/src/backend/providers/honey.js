const CouponProvider= require('../couponprovider').CouponProvider;
const Coupon= require('../coupon').Coupon;
const Util= require('../../common/util').Util;

class Honey extends CouponProvider{

  constructor(){
    super({_name: Honey._name});
  }
  hasUgc() {
    return true;
  }

  parseCoupons(statusCode, data){
    const coupons= [];
    const result = JSON.parse(data);
    Util.assertFieldInObject("coupons", result, "result",Honey.ERROR_TAG);
    for (const rawCoupon of result.coupons) {
      Util.assertFieldsInObject(["code", "description", "expires"], rawCoupon, "rawCoupon",Honey.ERROR_TAG);
      //discard coupons with code = 2 chars or less
      if(rawCoupon.code.length<=2){
        continue;
      }
      let coupon= new Coupon({
        name: Coupon.cleanupName(rawCoupon.description),
        code: rawCoupon.code,
        endDate : rawCoupon.expires,
        startDate : Util.getTimestamp()
      });
      coupons.push(coupon);
    }
    return coupons;
  }
  getRequest(store){
    const request= {
      url: '******************',
      method: 'GET',
      proxify: true
    };
    request.url= request.url.replace('STORE_ID', store.xref.honey);
    return request;
  }
}
Honey._name= 'honey';
Honey.ERROR_TAG= 'error-honey';

exports.Honey= Honey;
