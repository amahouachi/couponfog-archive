import {Client} from "./Client";
import {Analytics} from "./Analytics";
import {Config} from "./Config";

const generate = require('nanoid/generate');
const nanoidAlphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function uuid(){
  return generate(nanoidAlphabet, 20);
}
export function now(){
  return Math.floor(Date.now() / 1000);
}
export function getCurrentMonthYear(){
  let date = new Date();
  return months[date.getMonth()] + ' ' + date.getFullYear();
}
export function getCurrentYear(){
  let date = new Date();
  return date.getFullYear();
}
export function getCouponExpireLabel(endDate){
  const _24Hours= 3600*24;
  if(endDate===0){
    return "";
  }
  const nowts= now();
  if(endDate>nowts+_24Hours){
    return ""
  }
  if(endDate>nowts-_24Hours){
    return "Expires soon";
  }else{
    return "Expired";
  }
}
export function openCouponNewWindow(couponId){
  window.open(window.location.href.replace(/#c[0-9]+/g, '') + "#c" + couponId, "_blank");
}
export function openStoreWebsite(storeId, storeName, couponId, newWindow=true){
  Analytics.logShopTrip(storeName);
  Client.setLastOpenedStore(storeId);
  let url= `${Config.outUrl}/out?s=${storeId}&c=${Client.getId()}`;
  if(couponId){
    url+= `&cp=${couponId}`
  }
  if(newWindow){
    window.open(url, "_blank");
  }else{
    window.location.href= url;
  }
}
export function isMobileAndroid(){
  return navigator.userAgent.match(/android/i);
}
export function getCollectionItemIndex(id, collection){
  let index= -1;
  for(const item of collection){
    index++;
    if(item.id===id){
      return index;
    }
  }
  return -1;
}
export function isItemInCollection(id, collection){
  for(const item of collection){
    if(item.id===id){
      return true;
    }
  }
  return false;
}
export function removeItemFromCollection(id, collection){
  let index= getCollectionItemIndex(id, collection);
  if(index>=0){
    collection.splice(index, 1);
  }
  return index>=0;
}
export function timeout(promise, ms){
  const timeoutPromise = new Promise((resolve, reject) => {
    let id = setTimeout(() => {
      clearTimeout(id);
      reject('Timed out in '+ ms + 'ms.')
    }, ms)
  });
  return Promise.race([
    promise,
    timeoutPromise
  ])
}
