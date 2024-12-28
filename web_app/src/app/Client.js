import {DB} from "./DB";
import {isItemInCollection, isMobileAndroid, removeItemFromCollection, uuid} from "./Util";
import {Server} from "./Server";
import {Config} from "./Config";

let instance;

export const Client= {
  instance: null,
  KEY_CLIENT: "client",
  KEY_SAVED_COUPONS: "savedCoupons",
  KEY_FAVORITE_STORES: "favoriteStores",
  savedCoupons: [],
  favoriteStores: [],
  lastOpenedStoreId: null,
  shouldDisplayAppBannerFlag: false,
  getId: () => {
    return instance.id;
  },
  initialize: async () => {
    if(instance){
      return;
    }
    Client.savedCoupons= await DB.getCollectionItems(Client.KEY_SAVED_COUPONS);
    Client.favoriteStores= await DB.getCollectionItems(Client.KEY_FAVORITE_STORES);
    Client.lastOpenedStoreId= await DB.getCachedItem("lastOpenedStoreId");
    instance= await DB.getItem(Client.KEY_CLIENT);
    if(instance==null){
      instance= { id: uuid() };
      DB.setItem(Client.KEY_CLIENT, instance);
    }
    Client.shouldDisplayAppBannerFlag= await Client.shouldDisplayAppBanner();
  },
  shouldDisplayAppBanner: async () => {
    if(!isMobileAndroid()){
      return false;
    }
    const appBannerUserAction= await DB.getCachedItem("appBannerUserAction");
    if(!appBannerUserAction){
      return true;
    }
    if(appBannerUserAction.action==="close"){
      return true;
    }else if(appBannerUserAction.action==="click"){
      return false;
    }
    return false;
  },
  addFavoriteStore: (store) => {
    if(!Client.isFavoriteStore(store.id)){
      Client.favoriteStores.push(store);
      DB.addToCollection(Client.KEY_FAVORITE_STORES, store);
      Server.updateFavoriteStores(Client.favoriteStores);
    }
  },
  removeFavoriteStore: (id) => {
    let index= removeItemFromCollection(id, Client.favoriteStores);
    if(index>=0){
      DB.removeFromCollection(Client.KEY_FAVORITE_STORES, id);
      Server.updateFavoriteStores(Client.favoriteStores);
    }
  },
  isFavoriteStore: (id) => {
    return isItemInCollection(id, Client.favoriteStores);
  },
  addSavedCoupon: (coupon) => {
    if(!Client.isSavedCoupon(coupon.id)){
      Client.savedCoupons.push(coupon);
      DB.addToCollection(Client.KEY_SAVED_COUPONS, coupon);
    }
  },
  removeSavedCoupon: (id) => {
    let index= removeItemFromCollection(id, Client.savedCoupons);
    if(index>=0){
      DB.removeFromCollection(Client.KEY_SAVED_COUPONS, id);
    }
  },
  isSavedCoupon: (id) => {
    return isItemInCollection(id, Client.savedCoupons);
  },
  setLastOpenedStore: (id) => {
    Client.lastOpenedStoreId= id;
    DB.setCachedItem("lastOpenedStoreId", id, Config.lastOpenedStoreGracePeriod);
  }
};