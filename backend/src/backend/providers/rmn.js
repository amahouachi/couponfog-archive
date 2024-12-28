const CouponProvider= require('../couponprovider').CouponProvider;
const Coupon= require('../coupon').Coupon;
const Util= require('../../common/util').Util;

class RMN extends CouponProvider{

  constructor(){
    super({_name: RMN._name});
  }
  hasUgc() {
    return true;
  }

  parseCoupons(statusCode, data){
    const coupons= [];
    const result = JSON.parse(data);
    Util.assertFieldInObject("hits", result, "result", RMN.ERROR_TAG);
    if (result.hits.length == 0) {
      return [];
    }
    const hit = result.hits[0];
    Util.assertFieldInObject("codes", hit, "hit", RMN.ERROR_TAG);
    const now= Util.getTimestamp();
    for(const rawCoupon of hit.codes){
      Util.assertFieldsInObject(["title","code"], rawCoupon, "rawCoupon",RMN.ERROR_TAG);
      if(!rawCoupon.ranking || rawCoupon.ranking==='Top Rated') {
        if(!rawCoupon.title || !rawCoupon.code){
          continue;
        }
        let startDate= now;
        if(rawCoupon.startDate!=null){
          startDate = Util.getTimestamp(rawCoupon.startDate);
        }
        if (startDate === 0) {
          startDate = now;
        }
        let endDate= 0;
        if(rawCoupon.endDate!=null){
          endDate = Util.getTimestamp(rawCoupon.endDate);
        }
        let coupon = new Coupon({
          name: Coupon.cleanupName(rawCoupon.title),
          code: rawCoupon.code,
          endDate: endDate,
          startDate: startDate
        });
        coupons.push(coupon);
      }
    }
    return coupons;
  }
  getRequest(store){
    const request= {
      url: '*******************************',
      method: 'POST',
      body: '{"params":"query=&filters=domain%3A_DOMAIN_&distinct=true"}',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      proxify: true
    };
    request.body= request.body.replace('_DOMAIN_', store.domain);
    return request;
  }
}
RMN._name= 'rmn';
RMN.ERROR_TAG= 'rmn-error';

exports.RMN= RMN;
