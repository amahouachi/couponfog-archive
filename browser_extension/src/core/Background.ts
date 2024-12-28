import BackgroundUtils from "../util/BackgroundUtils";
import Message from "../util/Message";
import {Utils} from "../util/Utils";
import {Store, StoreID} from "../model/Store";
import {Client} from "../model/Client";
import {Config} from "../service/Config";
import {Saving} from "../model/Saving";
import Tab = chrome.tabs.Tab;

let allStores= Array<StoreID>();
const tabsCache= {};
let tabToClose: number|null= null;

function getIconsData(active: boolean){
  const data= {};
  let suffix= "";
  if(!active){
    suffix= "_grey";
  }
  for(const size of ['16','32','48']){
    data[size]= `icons/cficon_${size}${suffix}.png`;
  }
  return data;
}
function toggleIcon(active: boolean, tabId: number){
  if (active){
    chrome.browserAction.setIcon({path : getIconsData(true), tabId});
  } else {
    chrome.browserAction.setIcon({path: getIconsData(false), tabId});
  }
}
function scheduleStoresRefresh(){
  console.log("refreshing stores");
  fetch(Config.allStoresUrl).then( (response) => {
    response.json().then((storesJson) => {
      allStores= storesJson;
    })
  });
  setTimeout(function () {
    scheduleStoresRefresh();
  },Config.allStoresRefreshPeriod*1000);
}
async function createClient(){
  const client= Client.create();
  await fetch(`${Config.apiRootUrl}/api/clients`,{
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id : client.id , type: "extension"})
  });
}
async function createSaving(clientId: string,saving: Saving){
  await fetch(`${Config.apiRootUrl}/api/clients/${clientId}/savings`,{
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saving)
  });
}
function getOutUrl(clientId, storeId){
  return `${Config.outUrl}/out?c=${clientId}&s=${storeId}`;
}

/**************************
 * Browser event listeners
 **************************/

// Fired when a tab is updated (reloaded etc.)
// https://developer.chrome.com/extensions/tabs#event-onUpdated
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  const tabKey= "tab_"+tabId;
  if(tab.url!=null){
    if(tabToClose==null){
      if (changeInfo.status == 'loading') {
        const domain= Utils.getDomain(tab.url);
        let slug: string|null= null;
        for(const s of allStores){
          for(const urlPattern of s.urlPatterns){
            if(tab.url.match(urlPattern)){
              slug= s.slug;
              break;
            }
          }
        }
        if(slug){
          console.log("Supported : "+domain);
          fetch(`${Config.apiRootUrl}/api/stores/${slug}?target=extension`).then( (response) => {
            response.json().then((storeJson) => {
              if(storeJson==null){
                storeJson= {};
              }
              if("id" in storeJson){
                tabsCache[tabKey]= new Store(storeJson);
              }
            })
          });
        }else{
          delete tabsCache[tabKey];
          console.log("Not supported : "+domain);
        }
      }else if(changeInfo.status==='complete'){
        if(tabKey in tabsCache){
          const store= tabsCache[tabKey];
          toggleIcon(true, tabId);
          chrome.tabs.sendMessage(tabId, new Message(Message.ID_BROWSED_SUPPORTED_STORE, store));
          if(store.coupons.length>0){
            chrome.browserAction.setBadgeText({tabId: tabId, text: store.coupons.length.toString()});
            chrome.browserAction.setBadgeBackgroundColor({color: "#E64A19"});
          }
        }
      }
    }else{
      if(changeInfo.status==='complete'){
        chrome.tabs.remove(tabToClose, function() {});
        tabToClose= null;
      }
    }
  }
});

// Fired when the active tab changes
// https://developer.chrome.com/extensions/tabs#event-onActivated
chrome.tabs.onActivated.addListener( function (activeInfo) {
  let tabKey= "tab_"+activeInfo.tabId;
  toggleIcon(tabKey in tabsCache, activeInfo.tabId);
});

// Fired when a tab is closed
// https://developer.chrome.com/extensions/tabs#event-onRemoved
chrome.tabs.onRemoved.addListener( function (tabId, removeInfo) {
  let tabKey= "tab_"+tabId;
  if(tabKey in tabsCache){
    tabsCache[tabKey]= {};
  }
});


// Fired when browser action is clicked
// https://developer.chrome.com/extensions/browserAction#event-onClicked
chrome.browserAction.onClicked.addListener(function(tab: Tab) {
  let tabKey= "tab_"+tab.id;
  let store= tabsCache[tabKey];
/*
  if(tabKey in tabsCache && "domain" in tabsCache[tabKey]){
    store= tabsCache[tabKey];
  }
*/
  BackgroundUtils.sendMessageToTab(new Message(Message.ID_CLICKED_EXTENSION_ICON, store), tab.id);
});
chrome.runtime.onStartup.addListener(function() {
  scheduleStoresRefresh();
});
chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason==="install"){
    createClient();
    scheduleStoresRefresh();
  }
});

/**
 *  Listen to messages from content.js
 */
chrome.runtime.onMessage.addListener(function(message: Message,sender,callback){
  switch (message.id) {
    case Message.ID_CREATE_SAVING:
      createSaving(message.data.clientId, message.data.saving);
      break;
    case Message.ID_OPEN_AFFILIATE_TAB:
      chrome.tabs.create({'url': getOutUrl(message.data.clientId, message.data.storeId), 'active': false}, function(tab) {
        if(tab.id){
          tabToClose= tab.id;
        }
      });
      break;
  }
});
