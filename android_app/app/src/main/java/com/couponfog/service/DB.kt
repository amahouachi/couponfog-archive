package com.couponfog.service

import android.content.Context
import android.content.SharedPreferences
import android.os.Build
import com.couponfog.model.Client
import com.couponfog.model.Coupon
import com.couponfog.model.Notification
import com.couponfog.model.Store
import com.google.gson.Gson
import java.io.Serializable
import java.lang.reflect.Type
import android.R.attr.versionName
import android.content.pm.PackageManager
import org.json.JSONObject


class DB {

  private lateinit var sharedPreferences: SharedPreferences

  /*private fun parseCoupons(json: String): ArrayList<Coupon>{
    val itemType = object : TypeToken<List<Coupon>>() {}.type
    return Gson().fromJson<ArrayList<Coupon>>(json, itemType) ?: ArrayList()
  }
  private fun parseStores(json: String): ArrayList<Store>{
    val itemType = object : TypeToken<List<Store>>() {}.type
    return Gson().fromJson<ArrayList<Store>>(json, itemType) ?: ArrayList()
  }*/
  private fun getInt(key: String, default: Int): Int{
    return sharedPreferences.getInt(key, default)
  }
  private fun getString(key: String): String?{
    return sharedPreferences.getString(key,null)
  }
  private fun setInt(key: String, value: Int){
    sharedPreferences.edit().putInt(key, value).apply()
  }
  private fun setString(key: String, value: String){
    sharedPreferences.edit().putString(key,value).apply()
  }
  private fun addToCollection(collectionName: String, id: String, obj: Serializable){
    var index= sharedPreferences.getString(collectionName, "")
    var ids: MutableList<String> = mutableListOf()
    var exists= false
    if(index==null || index==""){
      ids.add(id)
    }else{
      ids= index.split(":").toMutableList()
      if(ids.indexOf(id)==-1){
        ids.add(id)
      }else{
        exists= true
      }
    }
    sharedPreferences.edit()
      .putString(collectionName, ids.joinToString(":"))
      .putString("$collectionName:$id", Gson().toJson(obj))
      .apply()
  }
  private fun removeFromCollection(collectionName: String, id: String){
    val index= sharedPreferences.getString(collectionName, "")
    var ids: MutableList<String> = mutableListOf()
    if(index==null || index=="") {
      return
    }
    ids= index.split(":").toMutableList()
    val idToRemove= ids.indexOf(id)
    if(idToRemove==-1){
      return
    }
    ids.removeAt(idToRemove)
    sharedPreferences.edit()
      .putString(collectionName, ids.joinToString(":"))
      .remove("$collectionName:$id")
      .apply()
  }
  private fun getCollection(collectionName: String, type: Type, order: Int) : ArrayList<Serializable>{
    val gson= Gson()
    var results= ArrayList<Serializable>()
    val index= sharedPreferences.getString(collectionName, "")
    var ids: MutableList<String> = mutableListOf()
    if(index==null || index=="") {
      return results
    }
    ids= index.split(":").toMutableList()
    for (id in ids){
      val json= sharedPreferences.getString("$collectionName:$id",null)
      val obj: Serializable= gson.fromJson(json,type)
      if(obj!=null){
        results.add(obj)
      }
    }
    if(order== ORDER_NEW_TO_OLD){
      results.reverse()
    }
    return results
  }
  private fun addToCollectionIndex(collectionName: String, id: String){
    val index= sharedPreferences.getString(collectionName, "")
    var ids: MutableList<String> = mutableListOf()
    var exists= false
    if(index=="" || index==null){
      ids.add(id)
    }else{
      ids= index.split(":").toMutableList()
      if(ids.indexOf(id)==-1){
        ids.add(id)
      }else{
        exists= true
      }
    }
    if(!exists){
      sharedPreferences.edit()
        .putString(collectionName, ids.joinToString(":"))
        .apply()
    }
  }
  private fun removeFromCollectionIndex(collectionName: String, id: String){
    val index= sharedPreferences.getString(collectionName, "")
    var ids: MutableList<String> = mutableListOf()
    if(index==null||index=="") {
      return
    }
    ids= index.split(":").toMutableList()
    val idToRemove= ids.indexOf(id)
    if(idToRemove==-1){
      return
    }
    ids.removeAt(idToRemove)
    sharedPreferences.edit()
      .putString(collectionName, ids.joinToString(":"))
      .apply()
  }
  private fun getCollectionIndex(collectionName: String) : MutableList<String>{
    var ids: MutableList<String> = mutableListOf()
    val index= sharedPreferences.getString(collectionName, "")
    if(index==null||index=="") {
      return ids
    }
    ids= index.split(":").toMutableList()
    return ids
  }
  private fun clearCollectionIndex(collectionName: String){
    sharedPreferences.edit()
      .putString(collectionName, "")
      .apply()
  }
  private fun migrateDBFromV5ToV6(){
    val storeIds= getCollectionIndex(KEY_FAVORITE_STORES)
    for(id in storeIds){
      val json= sharedPreferences.getString("$KEY_FAVORITE_STORES:$id",null)
      val obj= JSONObject(json)
      val s= Store(obj.getString("a"), obj.getString("b"), obj.getString("c"), ArrayList(), obj.getInt("e"))
      sharedPreferences.edit()
        .putString("$KEY_FAVORITE_STORES:$id", Gson().toJson(s))
        .commit()
    }
    val couponIds= getCollectionIndex(KEY_SAVED_COUPONS)
    for(id in couponIds){
      sharedPreferences.edit().remove("$KEY_SAVED_COUPONS:$id").commit()
    }
    sharedPreferences.edit().remove(KEY_SAVED_COUPONS).commit()
    val notifIds= getCollectionIndex(KEY_NOTIFICATIONS)
    for(id in notifIds){
      sharedPreferences.edit().remove("$KEY_NOTIFICATIONS:$id").commit()
    }
    sharedPreferences.edit().remove(KEY_NOTIFICATIONS).commit()
  }
  companion object {

    const val KEY_SAVED_COUPONS = "SAVED_COUPONS"
    const val KEY_FAVORITE_STORES = "FAVORITE_STORES"
    const val KEY_NOTIFICATIONS = "NOTIFICATIONS"
    const val KEY_NEW_NOTIFICATIONS = "NEW_NOTIFICATIONS"
    const val KEY_CLIENT_ID = "CLIENT_ID"
    const val KEY_IS_NEW_USER = "IS_NEW_USER"
    const val KEY_APP_LAUNCHES = "APP_LAUNCHES"
    const val PREF_FILE = "app.db"

    const val ORDER_OLD_TO_NEW= 0
    const val ORDER_NEW_TO_OLD= 1

    @Volatile
    private var instance: DB? = null
    fun initialize(context: Context){
      if(instance==null){
        instance= DB()
        instance?.sharedPreferences= context.getSharedPreferences(PREF_FILE, Context.MODE_PRIVATE)
        val migrationDone= instance!!.sharedPreferences.getBoolean("MigrationFromV5DoneDB", false)
        if(!migrationDone){
          instance!!.migrateDBFromV5ToV6()
          instance!!.sharedPreferences.edit().putBoolean("MigrationFromV5DoneDB", true).commit()
        }
      }
    }
    fun getInstance(): DB?{
      return instance
    }
    fun getAppLaunches(): Int{
      return instance!!.getInt(KEY_APP_LAUNCHES, 0)
    }
    fun recordAppLaunch(){
      instance!!.setInt(KEY_APP_LAUNCHES, getAppLaunches()+1)
    }
    fun getClient(): Client?{
      val id= instance!!.getString(KEY_CLIENT_ID) ?: return null
      return Client(id)
    }
    fun setClient(client: Client){
      instance!!.setString(KEY_CLIENT_ID, client.id)
    }
    fun getSavedCoupons(): ArrayList<Coupon>{
      return instance!!.getCollection(KEY_SAVED_COUPONS, Coupon::class.java, ORDER_NEW_TO_OLD) as ArrayList<Coupon>
    }
    fun getFavoriteStores(): ArrayList<Store>{
      return instance!!.getCollection(KEY_FAVORITE_STORES, Store::class.java, ORDER_NEW_TO_OLD) as ArrayList<Store>
    }
    fun addSavedCoupon(coupon: Coupon){
      instance!!.addToCollection(KEY_SAVED_COUPONS, coupon.id, coupon)
    }
    fun addFavoriteStore(store: Store){
      instance!!.addToCollection(KEY_FAVORITE_STORES, store.id, store)
    }
    fun addNotification(notification: Notification){
      instance!!.addToCollectionIndex(KEY_NEW_NOTIFICATIONS, notification.id.toString())
      instance!!.addToCollection(KEY_NOTIFICATIONS, notification.id.toString(), notification)
    }
    fun clearNewNotifications(){
      instance!!.clearCollectionIndex(KEY_NEW_NOTIFICATIONS)
    }
    fun getNewNotificationsCount(): Int{
      return instance!!.getCollectionIndex(KEY_NEW_NOTIFICATIONS).size
    }
    fun getNotifications(): ArrayList<Notification>{
      return instance!!.getCollection(KEY_NOTIFICATIONS, Notification::class.java, ORDER_NEW_TO_OLD) as ArrayList<Notification>
    }
    fun removeSavedCoupon(couponId: String){
      instance!!.removeFromCollection(KEY_SAVED_COUPONS, couponId)
    }
    fun removeFavoriteStore(storeId: String){
      instance!!.removeFromCollection(KEY_FAVORITE_STORES, storeId)
    }
    fun removeNotification(notificationId: String){
      instance!!.removeFromCollection(KEY_NOTIFICATIONS, notificationId)
    }
  }
}