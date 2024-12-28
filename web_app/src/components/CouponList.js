import React, {useState} from "react";
import Coupon from "./Coupon";
import { openStoreWebsite } from "../app/Util";
import CouponPopup from "./CouponPopup";
import {useHistory, useLocation} from 'react-router-dom';
import {Client} from "../app/Client";
import {Config} from "../app/Config";
import {Analytics} from "../app/Analytics";

export default function CouponList({coupons, store, expired=false}){

  const [savedCouponIds,setSavedCouponIds]= useState([]);
  const [savedCouponIdsLoaded, setSavedCouponIdsLoaded]= useState(false);

  if(!savedCouponIdsLoaded){
    const tmpSavedCouponsId= {};
    for(const c of Client.savedCoupons){
      tmpSavedCouponsId[c.id]= 1;
    }
    setSavedCouponIdsLoaded(true);
    setSavedCouponIds(tmpSavedCouponsId);
  }

  const location= useLocation();
  let selectedCouponId;
  if(location.hash){
    const matches= location.hash.match(/^#c([0-9]+)$/);
    if(matches && matches.length>1){
      selectedCouponId= Number.parseInt(matches[1]);
    }
  }
  let initialSelectedCoupon;
  if(selectedCouponId){
    for(const c of coupons){
      if(c.id===selectedCouponId){
        initialSelectedCoupon= c;
        break;
      }
    }
  }
  const [selectedCoupon,setSelectedCoupon]= useState(initialSelectedCoupon);
  const history= useHistory();

  const onSave= coupon => {
    Client.addSavedCoupon(coupon);
    setSavedCouponIds(Object.assign({[coupon.id]: 1}, savedCouponIds));
    Analytics.logCouponSave(coupon);
  };
  const onUnsave= id => {
    Client.removeSavedCoupon(id);
    const newState= Object.assign({}, savedCouponIds);
    delete newState[id];
    console.log(newState);
    setSavedCouponIds(newState);
  };
  const onClick= coupon => {
    if(coupon.storeId===Client.lastOpenedStoreId){
      history.push(location.pathname+"#c"+coupon.id);
      setSelectedCoupon(coupon);
    }else{
      openStoreWebsite(coupon.storeId, coupon.storeName, coupon.id, false);
    }
  };
  const onCloseCouponPopup= () => {
    setSelectedCoupon(null);
  };
  const getCouponLdJson= (coupon, store) => {
    let offerCategory= "Clearance/Sale";
    if(coupon.discount.type==='freeShipping'){
      offerCategory= "Free Shipping";
    }else if(coupon.discount.type==='percentOff'||coupon.discount.type==='dollarOff'){
      offerCategory= "Discount";
    }
    return {
      "@context": "http://schema.org",
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD",
      "category": offerCategory,
      "name": coupon.name,
      "description": coupon.description,
      "url": Config.webApp.baseUrl+'/coupons/'+store.slug+'#'+coupon.id,
      "seller": {
        "@type": "Corporation",
        "url": store.url,
        "name": store.name
      }
    }
  };

  return (
      <React.Fragment>
      {
            coupons.map(coupon => {
              return (
                  <React.Fragment key={`f${coupon.id}`}>
                    <Coupon expired={expired} key={coupon.id} onClick={onClick} coupon={coupon} isSaved={(coupon.id in savedCouponIds)} displayStore={store==null} onSave={onSave} onUnsave={onUnsave}/>
                    {
                      store?
                          <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(getCouponLdJson(coupon,store))}}></script>
                          :
                          null
                    }
                  </React.Fragment>
              )
            })
      }
      <CouponPopup coupon={selectedCoupon} onClose={onCloseCouponPopup}/>
      </React.Fragment>

  );
}