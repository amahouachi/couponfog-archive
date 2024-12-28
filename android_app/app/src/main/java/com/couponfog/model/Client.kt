package com.couponfog.model

import android.os.Handler
import com.android.volley.Response
import com.aventrix.jnanoid.jnanoid.NanoIdUtils
import com.couponfog.service.Analytics
import com.couponfog.service.DB
import com.couponfog.service.PushService
import com.couponfog.service.Server
import com.google.android.gms.tasks.OnCompleteListener
import com.google.firebase.iid.FirebaseInstanceId
import com.google.firebase.messaging.FirebaseMessaging
import java.util.*
import kotlin.collections.ArrayList

class Client constructor(var id: String){
  var savedCoupons = ArrayList<Coupon>()
  var favoriteStores = ArrayList<Store>()

  companion object{
    private val idAlphabet= "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray()
    private var INSTANCE: Client? = null
    fun initialize(){
      if(INSTANCE!=null){
        return
      }
      INSTANCE= DB.getClient()
      if(INSTANCE==null){
        INSTANCE= Client(NanoIdUtils.randomNanoId(NanoIdUtils.DEFAULT_NUMBER_GENERATOR, idAlphabet, 20));
        DB.setClient(INSTANCE!!)
      }else{
        INSTANCE!!.savedCoupons= DB.getSavedCoupons()
        INSTANCE!!.favoriteStores= DB.getFavoriteStores()
      }
    }
    fun getId(): String{
      return INSTANCE!!.id
    }
    fun getFavoriteStores(): ArrayList<Store>{
      return INSTANCE!!.favoriteStores
    }
    fun getSavedCoupons(): ArrayList<Coupon>{
      return INSTANCE!!.savedCoupons
    }
    fun addSavedCoupon(coupon: Coupon) {
      INSTANCE!!.savedCoupons.add(coupon)
      DB.addSavedCoupon(coupon)
      Analytics.logCouponSave(coupon)
    }

    fun removeSavedCoupon(id: String) {
      val savedCoupons= INSTANCE!!.savedCoupons
      for (i in savedCoupons.indices) {
        if (savedCoupons[i].id == id) {
          savedCoupons.removeAt(i)
          break
        }
      }
      DB.removeSavedCoupon(id)
    }

    fun isSavedCoupon(id: String): Boolean {
      val savedCoupons= INSTANCE!!.savedCoupons
      for (i in savedCoupons.indices) {
        if (savedCoupons[i].id == id) {
          return true
        }
      }
      return false
    }

    fun addFavoriteStore(store: Store) {
      val favoriteStores= INSTANCE!!.favoriteStores
      favoriteStores.add(store)
      DB.addFavoriteStore(store)
      Server.setFavoriteStores()
      Analytics.logStoreFave(store)
      PushService.enableFirebaseMessaging()
    }

    fun removeFavoriteStore(store: Store) {
      val favoriteStores= INSTANCE!!.favoriteStores
      for (i in favoriteStores.indices) {
        if (favoriteStores[i].id == store.id) {
          favoriteStores.removeAt(i)
          break
        }
      }
      DB.removeFavoriteStore(store.id)
      Server.setFavoriteStores()
      Analytics.logStoreUnfave(store)
    }

    fun isFavoriteStore(id: String): Boolean {
      val favoriteStores= INSTANCE!!.favoriteStores
      for (i in favoriteStores.indices) {
        if (favoriteStores[i].id == id) {
          return true
        }
      }
      return false
    }

  }

}