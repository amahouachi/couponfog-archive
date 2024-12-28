package com.couponfog.model

import com.couponfog.service.DB
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import java.io.Serializable
import java.text.SimpleDateFormat
import java.util.*
import kotlin.collections.ArrayList

/*
    message : {
      data : {
        type : coupon-alert|...
        title: Kohl's
        body: 3 new coupons added|20% off your purchase
        coupons: [{name: "10% off", store: ...}, {...}, ...]
        store: {id:344, name: Kohl's, slug: kohls}
      }
    }
 */
class Notification constructor(val type: String, val id: Int, val title: String, val body: String, val timestamp: Int) : Serializable{

  var coupons: ArrayList<Coupon>?= null
  var store: Store?= null
  var unread= true

  constructor(id: Int, title: String, body: String, timestamp: Int, store: Store) :
    this(TYPE_COUPON_ALERT_SUMMARY, id, title, body, timestamp){
    this.store= store
  }
  constructor(id: Int, title: String, body: String, timestamp: Int, store: Store, coupons: ArrayList<Coupon>) :
    this(TYPE_COUPON_ALERT_FULL, id, title, body, timestamp){
    this.store= store
    this.coupons= coupons
  }
  constructor(id: Int, title: String, body: String, timestamp: Int, store: Store, unread: Boolean) :
    this(TYPE_COUPON_ALERT_SUMMARY, id, title, body, timestamp){
    this.store= store
    this.unread= unread
  }
  constructor(id: Int, title: String, body: String, timestamp: Int, store: Store, coupons: ArrayList<Coupon>, unread: Boolean) :
    this(TYPE_COUPON_ALERT_FULL, id, title, body, timestamp){
    this.store= store
    this.coupons= coupons
    this.unread= unread
  }

  fun markAsRead(){
    unread= false
    save()
  }
  fun save(){
    DB.addNotification(this)
  }
  fun getDisplayDate(): String{
    val d= Date(timestamp.toLong() * 1000L)
    val today= Date()
    if(DATE_FORMAT_yyyyMMdd.format(today)== DATE_FORMAT_yyyyMMdd.format(d)){
      return DATE_FORMAT_HHmm.format(d)
    }else{
      return DATE_FORMAT_MMMdd.format(d)
    }
  }

  companion object {
    const val TYPE_COUPON_ALERT_FULL= "coupon-alert-full"
    const val TYPE_COUPON_ALERT_SUMMARY= "coupon-alert-summary"

    const val KEY_TYPE = "type"
    const val KEY_TIMESTAMP = "timestamp"
    const val KEY_TITLE = "title"
    const val KEY_BODY = "body"
    const val KEY_COUPONS = "coupons"
    const val KEY_STORE = "store"
    const val KEY_URL = "url"

    val DATE_FORMAT_yyyyMMdd= SimpleDateFormat("yyyy-MM-dd")
    val DATE_FORMAT_MMMdd= SimpleDateFormat("MMM dd")
    val DATE_FORMAT_HHmm= SimpleDateFormat("HH:mm")

    fun fromData(data: Map<String,String>) : Notification?{
      val gson= Gson()
      if(data[KEY_TYPE]==null){
        return null
      }
      val id = 0 - (System.currentTimeMillis().toInt())
      val type= data[KEY_TYPE]
      var title= data[KEY_TITLE]
      var body= data[KEY_BODY]
      var timestamp= data[KEY_TIMESTAMP]?.toInt()
      if(timestamp==null){
        timestamp= (System.currentTimeMillis()/1000).toInt()
      }
      if(type==TYPE_COUPON_ALERT_FULL) {
        val couponsData = data[KEY_COUPONS] ?: return null
        val coupons: ArrayList<Coupon>
        val itemType = object : TypeToken<List<Coupon>>() {}.type
        try {
          coupons = gson.fromJson<ArrayList<Coupon>>(couponsData, itemType) ?: ArrayList()
        } catch (e: Exception) {
          e.printStackTrace()
          return null
        }
        if (coupons.isEmpty()) {
          return null
        }
        val storeData = data[KEY_STORE] ?: return null
        val store: Store
        try {
          store = gson.fromJson(storeData, Store::class.java)
        } catch (e: Exception) {
          e.printStackTrace()
          return null
        }
        if (title == null) {
          title = store.name
        }
        if (body == null) {
          if (coupons.size == 1) {
            body = coupons[0].name
          } else {
            body = "${coupons.size} new coupons added"
          }
        }
        return Notification(id, title, body, timestamp, store, coupons)
      }else if(type== TYPE_COUPON_ALERT_SUMMARY){
        if (body == null) {
          return null
        }
        val storeData = data[KEY_STORE] ?: return null
        val store: Store
        try {
          store = gson.fromJson(storeData, Store::class.java)
        } catch (e: Exception) {
          e.printStackTrace()
          return null
        }
        if (title == null) {
          title = store.name
        }
        return Notification(id, title, body, timestamp, store)
      }else if(title!=null && body!=null){
        return Notification(type!!, id,title, body, timestamp)
      }else{
        return null
      }
    }
  }
}