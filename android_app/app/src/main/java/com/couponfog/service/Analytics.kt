package com.couponfog.service

import android.content.Context
import android.os.Bundle
import com.couponfog.R
import com.couponfog.app.Configuration
import com.couponfog.model.Coupon
import com.couponfog.model.Notification
import com.couponfog.model.Store
import com.google.android.gms.analytics.GoogleAnalytics
import com.google.android.gms.analytics.Tracker
import com.google.firebase.analytics.FirebaseAnalytics
import java.lang.Exception
import com.google.android.gms.analytics.HitBuilders

class Analytics {

  companion object{
    lateinit var context: Context
    lateinit var tracker: Tracker
    private const val KEY_ANALYTICS_DISABLED_EVENTS= "analytics_disabled_events"

    private const val EVENT_HOME= "home"
    private const val EVENT_STORE_VIEW= "store_view"
    private const val EVENT_STORE_FAVE= "store_fave"
    private const val EVENT_STORE_UNFAVE= "store_unfave"
    private const val EVENT_FAVED_STORES_VIEW= "faved_stores"
    private const val EVENT_SAVED_COUPONS_VIEW= "saved_coupons"
    private const val EVENT_COUPON_VIEW= "coupon_view"
    private const val EVENT_COUPON_SAVE= "coupon_save"
    private const val EVENT_COUPON_SHARE= "coupon_share"
    private const val EVENT_AD_CLICK= "ad_click"
    private const val EVENT_SHOP_TRIP= "shop_trip"
    private const val EVENT_NOTIFICATION_OPEN= "notification_open"

    fun initialize(ctx: Context){
      context= ctx.applicationContext
      tracker= GoogleAnalytics.getInstance(context).newTracker(R.xml.global_tracker)
    }
    private fun isEventDisabled(event: String): Boolean{
      for (e in Configuration.getRemotePropertyString(KEY_ANALYTICS_DISABLED_EVENTS).split(',')){
        if(e==event){
          return true
        }
      }
      return false
    }
    private fun logScreenView(event: String, screen: String){
      isEventDisabled(event) && return
      tracker.setScreenName(screen)
      try{tracker.send(HitBuilders.ScreenViewBuilder().build())}catch (e:Exception){}
    }
    private fun logEvent(event: String, category: String, action: String, label: String= ""){
      isEventDisabled(event) && return
      try{
        tracker.send(
          HitBuilders.EventBuilder()
            .setCategory(category)
            .setAction(action)
            .setLabel(label)
            .build()
        )
      }catch (e: Exception){}
    }
    fun logHomeView(){
      logScreenView(EVENT_HOME, "Home")
    }
    fun logStoreView(store: Store){
      logScreenView(EVENT_STORE_VIEW, store.name)
    }
    fun logFavoriteStoresView(){
      logScreenView(EVENT_FAVED_STORES_VIEW, "Favorite Stores")
    }
    fun logSavedCouponsView(){
      logScreenView(EVENT_SAVED_COUPONS_VIEW, "Saved Coupons")
    }
    fun logAdClick(){
      logEvent(EVENT_AD_CLICK, "Monetization", "AdClick")
    }
    fun logShopTrip(coupon: Coupon){
      logEvent(EVENT_SHOP_TRIP, "Monetization", "ShopTrip", coupon.storeName)
    }
    fun logStoreFave(store: Store){
      logEvent(EVENT_STORE_FAVE, "Store", "Fave", store.name)
    }
    fun logStoreUnfave(store: Store){
      logEvent(EVENT_STORE_UNFAVE, "Store", "UnFave", store.name)
    }
    fun logCouponView(coupon: Coupon){
      logEvent(EVENT_COUPON_VIEW, "Coupon", "View",coupon.storeName)
    }
    fun logCouponSave(coupon: Coupon){
      logEvent(EVENT_COUPON_SAVE, "Coupon", "Save", coupon.storeName)
    }
    fun logCouponShare(coupon: Coupon){
      logEvent(EVENT_COUPON_SHARE, "Coupon", "Share", coupon.storeName)
    }
    private fun logNotificationEvent(event: String, notification: Notification){
/*
      val params= Bundle()
      params.putString("notification_title", notification.title)
      params.putString("notification_body", notification.body)
      params.putString("store_name", notification.store?.name)
      try { FirebaseAnalytics.getInstance(context).logEvent(event, params) }catch (e: Exception) {}
*/
    }
    fun logNotificationReceived(notification: Notification){
      logNotificationEvent("notification_received", notification)
    }
    fun logNotificationOpen(storeName: String){
      logEvent(EVENT_NOTIFICATION_OPEN, "Notification", "Open", storeName)
    }
    fun logNotificationDismissed(notification: Notification){
      logNotificationEvent("notification_dismissed", notification)
    }
  }
}