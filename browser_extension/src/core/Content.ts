import Message from "../util/Message";
import {Store} from "../model/Store";
import {Popup} from "../view/Popup";
import {StoreView} from "../view/StoreView";
import {NoCouponsView} from "../view/NoCoupons";
import {NoStoreView} from "../view/NoStore";
import {Website} from "./Website";
import {Client} from "../model/Client";
import {Utils} from "../util/Utils";

var currentView: Popup|null= null;
Client.initialize();

function isSupportedMessage(id: string){
  return id===Message.ID_BROWSED_SUPPORTED_STORE||id===Message.ID_CLICKED_EXTENSION_ICON;
}

// Listen to messages from background
// https://developer.chrome.com/apps/messaging
// message.action determines the action to be done
chrome.runtime.onMessage.addListener(async (message: Message, sender, sendResponse) => {
  if(!isSupportedMessage(message.id)){
    return;
  }
  let store= message.data as Store;
  let website= new Website(store?.extensionSettings);
  switch(message.id){
    case Message.ID_CLICKED_EXTENSION_ICON:
      if(currentView){
        currentView.toggle();
        break;
      }
      if(store){
        if(store.coupons.length>0){
          currentView= new StoreView(store, website);
        }else{
          currentView= new NoCouponsView();
        }
      }else{
        currentView= new NoStoreView();
      }
      break;
    case Message.ID_BROWSED_SUPPORTED_STORE:
      await Utils.sleep(2);
      if(store.coupons.length>0 && website.shouldShowAutoApply()){
        if(currentView){
          currentView.close();
        }
        currentView= new StoreView(store, website, true);
      }
      break;
  }
});

