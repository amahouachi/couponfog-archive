import ReactGA from 'react-ga';
import {Config} from "./Config";

export const Analytics= {
  KEY_ANALYTICS_DISABLED_EVENTS: 'analytics_disabled_events',
  EVENT_HOME: "home",
  EVENT_SAVED_COUPONS_VIEW: "saved_coupons",
  EVENT_FAVED_STORES_VIEW: "faved_stores",
  EVENT_STORE_VIEW: "store_view",
  EVENT_STORE_FAVE: "store_fave",
  EVENT_STORE_UNFAVE: "store_unfave",
  EVENT_COUPON_VIEW: "coupon_view",
  EVENT_COUPON_SAVE: "coupon_save",
  EVENT_SHOP_TRIP: "shop_trip",
  EVENT_NOTIFICATION_ENABLE: "notification_enable",
  EVENT_NOTIFICATION_DISABLE: "notification_disable",
  initialize: (config) => {
    ReactGA.initialize(config.trackingId, {
      debug: config.debug,
      titleCase: false
    });
  },
  isEventDisabled: (event) => {
    return Config.analytics.disabledEvents.includes(event);
  },
  logPageView: (event, title) => {
    if(Analytics.isEventDisabled(event)) return;
    ReactGA.pageview(window.location.pathname+window.location.search, [], title);
  },
  logEvent: (event, category, action, label= '') => {
    if(Analytics.isEventDisabled(event)) return;
    ReactGA.event({
      category: category,
      action: action,
      label: label
    });
  },
  logHomeView: () => {
    Analytics.logPageView(Analytics.EVENT_HOME, 'Home');
  },
  logSavedCouponsView: () => {
    Analytics.logPageView(Analytics.EVENT_SAVED_COUPONS_VIEW, 'Saved Coupons');
  },
  logFavoriteStoresView: () => {
    Analytics.logPageView(Analytics.EVENT_FAVED_STORES_VIEW, 'Favorite Stores');
  },
  logStoreView: (store) => {
    Analytics.logPageView(Analytics.EVENT_STORE_VIEW, store.name);
  },
  logCouponView: (coupon) => {
    Analytics.logEvent(Analytics.EVENT_COUPON_VIEW, "Coupon", "View",coupon.storeName);
  },
  logCouponSave: (coupon) => {
    Analytics.logEvent(Analytics.EVENT_COUPON_SAVE, "Coupon", "Save",coupon.storeName);
  },
  logFaveStore: (store) => {
    Analytics.logEvent(Analytics.EVENT_STORE_FAVE, "Store", "Fave",`${store.name}`);
  },
  logUnfaveStore: (store) => {
    Analytics.logEvent(Analytics.EVENT_STORE_UNFAVE, "Store", "UnFave",`${store.name}`);
  },
  //notification enable/disable
  logNotificationEnable: () => {
    Analytics.logEvent(Analytics.EVENT_NOTIFICATION_ENABLE, "Notification", "Enable");
  },
  logNotificationDisable: () => {
    Analytics.logEvent(Analytics.EVENT_NOTIFICATION_DISABLE, "Notification", "Disable");
  },
  logShopTrip: (storeName) => {
    Analytics.logEvent(Analytics.EVENT_SHOP_TRIP, "Monetization", "ShopTrip", storeName);
  },
  //notification error during push subscribe
  logPushSubscribeError: (err) => {
    ReactGA.event({
      category: 'Notification',
      action: 'Error',
      label: err
    });
  },
  logNotificationOpen: (storeName) => {
    ReactGA.event({
      category: 'Notification',
      action: 'Open',
      label: storeName
    });
  },
};