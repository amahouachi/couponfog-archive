import {Client} from "./Client";
import {DB} from "./DB";
import {timeout} from "./Util";
import MiniSearch from "minisearch";
import {Config} from "./Config";

export const Server= {
  urls: [],
  mainUrl: '',
  timeout: 10000,
  cacheTtl: null,
  serverError: "Unable to retrieve data from server. Please retry later",
  initialize: ({urls, timeout, cacheTtl}) => {
    Server.urls= urls;
    Server.mainUrl= urls[Math.floor(Math.random() * urls.length)];
    Server.timeout= timeout;
    Server.cacheTtl= cacheTtl;
  },
  getAllStores: async () => {
    try{
      const response= await fetch(Config.webApp.allStoresUri, {mode: "cors"});
      return await response.json();
    }catch(e){
      return [];
    }
  },
  getTopStores: async () => {
    let stores= null;
    const response = await Server.httpGet('/api/topstores');
    if(response && response.ok){
      stores = await response.json();
    }
    return stores;
  },
  updateFavoriteStores: async (stores) => {
    const uri= `/api/clients/${Client.getId()}/stores`;
    Server.httpPost(
        uri,
        {
          'Content-Type': 'application/json',
        },
        JSON.stringify(stores.map(store => {return store.id;}))
    );
  },
  getStore: async (slug) => {
    let store= null, error= null;
    let response = await Server.httpGet('/api/stores/' + slug + "?target=web");
    if(response){
      if(response.ok){
        store = await response.json();
        if(store){
          DB.setCachedItem("store:"+slug, store, Server.cacheTtl.store);
        }
      }else if(response.status!==404){
        error= Server.serverError;
      }
    }else{
      error= Server.serverError;
    }
    return [store, error];
  },
  getLatestCoupons: async () => {
    let coupons= null;
    const response = await Server.httpGet('/api/coupons?target=web');
    if(response && response.ok){
      coupons = await response.json();
      if(coupons){
        DB.setCachedItem("latestCoupons",  coupons, Server.cacheTtl.latestCoupons);
      }
    }
    return coupons;
  },
  getFavedCoupons: async () => {
    let coupons= null;
    const response = await Server.httpGet('/api/clients/'+ Client.getId()+"/coupons");
    if(response && response.ok){
      coupons = await response.json();
      if(coupons){
        DB.setCachedItem("favedCoupons",  coupons, Server.cacheTtl.favedCoupons);
      }
    }
    return coupons;
  },
  updateNotificationSettings: async (enabled, token) => {
    const uri= "/api/clients/"+Client.getId()+"/notification";
    const response= await Server.httpPost(
        uri,
        {
          'Content-Type': 'application/json'
        },
        JSON.stringify({enabled, token})
    );
    if(response && response.ok){
      return await response.json();
    }
    return null;
  },
  httpGet: async (uri) => {
    let response= null;
    try{
      response= await timeout(fetch(Server.mainUrl+uri, { mode: "cors" }),Server.timeout);
    }catch (e) {
      console.log(e);
      for(const url of Server.urls){
        if(url===Server.mainUrl){
          continue;
        }
        try{
          response= await timeout(fetch(url+uri, { mode: "cors" }), Server.timeout);
          Server.mainUrl= url;
          break;
        }catch (e2) {
          console.log(e2);
        }
      }
    }
    return response;
  },
  httpPost: async(uri, headers, body) => {
    let response= null;
    try{
      response = await timeout(fetch(Server.mainUrl+uri, {
        method: 'POST',
        headers: headers,
        mode: "cors",
        body: body
      }), Server.timeout+10000);
    }catch (e) {
      console.log(e);
      for(const url of Server.urls){
        if(Server.mainUrl===url){
          continue;
        }
        try{
          response = await timeout(fetch(url+uri, {
            method: 'POST',
            headers: headers,
            mode: "cors",
            body: body
          }), Server.timeout+10000);
          Server.mainUrl= url;
          break;
        }catch (e) {
          console.log(e);
        }
      }
    }
    return response;
  }
}