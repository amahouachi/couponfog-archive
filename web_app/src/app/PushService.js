import firebase from 'firebase/app';
import 'firebase/messaging';
import {DB} from "./DB";
import {Server} from "./Server";
import {Analytics} from "./Analytics";

export const PushService= {
  NOTIFICATION_STATUS_NOT_SUPPORTED:0,
  NOTIFICATION_STATUS_NEUTRAL:1,
  NOTIFICATION_STATUS_ENABLED:2,
  NOTIFICATION_STATUS_DISABLED:3,
  NOTIFICATION_STATUS_DENIED:4,
  messagingAgent: null,
  notificationStatus: 0,
  initialize: () => {
    try{
      if(firebase.messaging.isSupported()){
        PushService.messagingAgent= firebase.messaging();
        navigator.serviceWorker.getRegistration('')
            .then(function(registration){
              if(!registration){
                navigator.serviceWorker.register('/sw.js')
                    .then(function (registration) {
                      PushService.messagingAgent.useServiceWorker(registration);
                    });
              }else{
                PushService.messagingAgent.useServiceWorker(registration);
              }
            });
        PushService.messagingAgent.onMessage((payload) => {
          PushService.handlePushMessage(payload);
        });
      }else{
        console.log("Messaging not supported");
        PushService.notificationStatus= PushService.NOTIFICATION_STATUS_NOT_SUPPORTED;
        DB.setItem("notificationStatus", PushService.notificationStatus);
      }
    }catch (e) {
      console.log(e);
    }
    PushService.getNotificationStatus().then(s => {
      PushService.notificationStatus= s;
    });
  },
  isNotificationDisabled: () => {
    return PushService.notificationStatus===PushService.NOTIFICATION_STATUS_NOT_SUPPORTED||PushService.notificationStatus===PushService.NOTIFICATION_STATUS_DENIED;
  },
  getNotificationStatus: async () => {
    if(!("Notification" in window) || !PushService.messagingAgent){
      return PushService.NOTIFICATION_STATUS_NOT_SUPPORTED;
    }
    switch(window.Notification.permission){
      case "granted":
        const appNotificationStatus= await DB.getItem("notificationStatus");
        if(appNotificationStatus!==null){
          return Number.parseInt(appNotificationStatus);
        }else{
          return PushService.NOTIFICATION_STATUS_DISABLED;
        }
      case "denied":
        return PushService.NOTIFICATION_STATUS_DENIED;
      default:
        return PushService.NOTIFICATION_STATUS_NEUTRAL;
    }
  },
  disableNotification: (onSuccess, onError) => {
    PushService.notificationStatus= PushService.NOTIFICATION_STATUS_DISABLED;
    DB.setItem("notificationStatus", PushService.notificationStatus)
        .then(() => PushService.sendFCMTokenToServer(null, onSuccess, onError));
    Analytics.logNotificationDisable();
  },
  enableNotification: (onSuccess, onError) => {
    PushService.messagingAgent.getToken()
        .then(async (currentToken) => {
          if (currentToken) {
            console.log('Token: ' + currentToken);
            PushService.notificationStatus= PushService.NOTIFICATION_STATUS_ENABLED;
            await DB.setItem("notificationStatus", PushService.notificationStatus);
            await PushService.sendFCMTokenToServer(currentToken, onSuccess, onError);
            Analytics.logNotificationEnable();
          } else {
            console.log('No Instance ID token available. Request permission to generate one.');
            Analytics.logPushSubscribeError("Firebase.getToken() promise resolved with empty token");
            if(onError){
              onError();
            }
          }
        })
        .catch(function(err) {
          console.log(err);
          Analytics.logPushSubscribeError(err);
          if(onError){
            onError();
          }
        });
    PushService.messagingAgent.onTokenRefresh(function() {
      PushService.messagingAgent.getToken()
          .then(function(refreshedToken) {
            console.log('Token refreshed.');
            PushService.sendFCMTokenToServer(refreshedToken);
          })
          .catch(function(err) {
            console.log('Unable to retrieve refreshed token ', err);
          });
    });
  },
  //TODO refactor
  sendFCMTokenToServer: async (token, onSuccess, onError) => {
    try{
      const notificationStatus= await PushService.getNotificationStatus();
      let notificationEnabled= 0;
      if(notificationStatus===PushService.NOTIFICATION_STATUS_ENABLED){
        notificationEnabled= 1;
      }
      const resp= await Server.updateNotificationSettings(notificationEnabled, token);
      if(resp && resp.status==="OK"){
        if(onSuccess){
          onSuccess();
        }
      }else{
        if(PushService.notificationStatus===PushService.NOTIFICATION_STATUS_ENABLED){
          PushService.notificationStatus= PushService.NOTIFICATION_STATUS_DISABLED;
        }else{
          PushService.notificationStatus= PushService.NOTIFICATION_STATUS_ENABLED;
        }
        await DB.setItem("notificationStatus", PushService.notificationStatus);
        if(onError){
          onError();
        }
      }
    }catch (e) {
      if(PushService.notificationStatus===PushService.NOTIFICATION_STATUS_ENABLED){
        PushService.notificationStatus= PushService.NOTIFICATION_STATUS_DISABLED;
      }else{
        PushService.notificationStatus= PushService.NOTIFICATION_STATUS_ENABLED;
      }
      await DB.setItem("notificationStatus", PushService.notificationStatus);
      if(onError){
        onError();
      }
      console.log(e);
    }
  },
  handlePushMessage: (payload) => {
/*
    console.log('Message received. ', payload);
    let coupons= payload.data.coupons;
    if(coupons){
      coupons= JSON.parse(coupons);
    }
    let store= payload.data.store;
    if(store){
      store= JSON.parse(store);
    }
    let title, body, url;
    if(payload.data.type==='coupon-alert' && coupons && coupons.length>0){
      title= coupons[0].storeName;
      url= '/coupons/'+store.slug;
      if(coupons.length===1){
        body= coupons[0].name;
        url+= '#c'+coupons[0].id;
      }else{
        body= coupons.length+" new coupons added";
      }
    }else{
      title= payload.data.title;
      body= payload.data.body;
      url= payload.data.url;
    }
    document.getElementById('snackbar-placeholder').hidden= false;
    ReactDOM.render(
        <ThemeProvider theme={theme}>
          <Snackbar
              open={true}
              onClick={
                ()=>{
                  document.getElementById('snackbar-placeholder').hidden= true;
                  Analytics.logNotificationOpen(store.name);
                  (url.indexOf('/')===0)?document.location.href=url:window.open(url, "_blank");
                }
              }
              action={"View Details"}
              onClose={()=>{document.getElementById('snackbar-placeholder').hidden= true;}}
              autoHideDuration={30000}
              message={title+": "+body}/>

        </ThemeProvider>,
        document.getElementById('snackbar-placeholder')
    );
*/
  }
};