import {now} from "./Util";
import localForage from 'localforage';

export const DB= {
  getItem: async (key) => {
    let item= null;
    try{
      item= await localForage.getItem(key);
    }catch (e) {
    }
    return item;
  },
  setItem: async (key,item) => {
    localForage.setItem(key, item);
  },
  getCachedItem: async(key, ignoreExpired=true) => {
    let data= null;
    try{
      const cacheEntry= await localForage.getItem(key);
      if(cacheEntry){
        data= {item: cacheEntry.item, expired: false};
        if(cacheEntry.expires<Date.now()){
          if(ignoreExpired){
            data= null;
          }else{
            data.expired= true;
          }
        }else if(ignoreExpired){
          data= data.item;
        }
      }
    }catch (e) {
      console.log(e);
    }
    return data;
  },
  //ttl in minutes
  setCachedItem: async (key, item, ttl) => {
    const expires= Date.now() + ttl*60*1000;
    localForage.setItem(key, {expires: expires, item: item});
  },
  addToCollection: async (collection, item) => {
    const items= await DB.getCollectionItems(collection);
    items.push(item);
    localForage.setItem(collection, items);
  },
  removeFromCollection: async (collection, itemId) => {
    const items= await DB.getCollectionItems(collection);
    for(let i=0; i<items.length; i++){
      let item= items[i];
      if(item.id===itemId){
        items.splice(i,1);
        break;
      }
    }
    localForage.setItem(collection, items);
  },
  getCollectionItems: async (collection) => {
    let items= await localForage.getItem(collection);
    if(!items){
      items= [];
    }
    return items;
  },
  delayAppBanner: () => {
    localStorage.setItem("appBannerUserAction", JSON.stringify({date: now(), action: 'close'}))
  },
  disableAppBanner: () => {
    localStorage.setItem("appBannerUserAction", JSON.stringify({date: now(), action: 'click'}))
  },
  setLastOpenedStore: (id) => {
    localStorage.setItem("lastOpenedStore", JSON.stringify({openDate: now(), id: id}));
  },
  getLastOpenedStoreId: async () => {
    const data= await localForage.getItem("lastOpenedStore");
    if(data==null){
      return null;
    }
    if(data.openDate<now()-(1*60)){
      return null;
    }
    return data.id;
  },
};