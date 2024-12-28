
export const Config= {
  outUrl: 'https://o.couponfog.com',
  webApp: {
    name: 'Couponfog',
    //baseUrl: 'https://www.couponfog.com',
    baseUrl: 'http://localhost:3000',
    allStoresUri: '/config/all_stores.json'
  },
  androidApp: {
    name: 'Couponfog App',
    url: 'https://play.google.com/store/apps/details?id=com.couponfog',
    promo: {
      hideDurationAfterClose: 60*24*5, // 5 days
      hideDurationAfterClick: 60*24*30 // 30 days
    }
  },
  server: {
    //urls: ["https://lb1-api.couponfog.com","https://lb2-api.couponfog.com"],
    //urls: ["https://192.168.1.27","http://192.168.1.27"],
    urls: ["https://api.couponfog.com"],
    timeout: 5000,
    cacheTtl: {
      //ttls in minutes
      latestCoupons: 5,
      store: 15,
      favedCoupons:15
    }
  },
  analytics: {
    trackingId: 'UA-23609270-37',
    debug: false,
    disabledEvents: ['ad_click','coupon_save']
  },
  firebaseConfig: {
    apiKey: "************************",
    authDomain: "couponfog.firebaseapp.com",
    databaseURL: "https://couponfog.firebaseio.com",
    projectId: "couponfog",
    storageBucket: "couponfog.appspot.com",
    messagingSenderId: "***************",
    appId: "***********************"
  },
  //time after coupon click during which no click-popup happens
  lastOpenedStoreGracePeriod: 5
};
