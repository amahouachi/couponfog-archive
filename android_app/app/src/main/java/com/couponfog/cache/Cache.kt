package com.couponfog.cache

import android.content.Context
import android.content.SharedPreferences
import android.content.pm.PackageManager
import com.couponfog.service.DB
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import java.lang.Exception


class Cache private constructor() {
  private var caches= HashMap<String,HashMap<String, CacheEntry>>()
  private lateinit var sharedPreferences: SharedPreferences

  private fun loadCache(cacheDataType: CacheDataType){
    val gsonBuilder = GsonBuilder()
    if(cacheDataType.getDeserializer()!=null){
      gsonBuilder.registerTypeAdapter(CacheEntry::class.java, cacheDataType.getDeserializer())
    }
    val gson= gsonBuilder.create()
    val namespace= cacheDataType.getNamespace()
    caches[namespace]= HashMap()
    val cacheKeysString= sharedPreferences.getString(namespace, "")
    if(cacheKeysString==null || cacheKeysString==""){
      return
    }
    val cacheKeys= cacheKeysString.split(":")
    for(key in cacheKeys){
      val value= sharedPreferences.getString("$namespace:$key", "")
      try {
        val entry: CacheEntry = gson.fromJson(value, CacheEntry::class.java)
        caches[namespace]!![key]= entry
      }catch (e: Exception){
        e.printStackTrace()
      }
    }
  }
  private fun addEntryToDisk(namespace: String, key: String, cacheEntry: CacheEntry){
    val gson= Gson()
    val cacheKeysString= sharedPreferences.getString(namespace, "")
    cacheKeysString?.let{
      var cacheKeys: MutableList<String> = mutableListOf()
      if(it==""){
        cacheKeys.add(key)
      }else{
        cacheKeys= it.split(":").toMutableList()
        if(cacheKeys.indexOf(key)==-1){
          cacheKeys.add(key)
        }
      }
      sharedPreferences.edit()
        .putString(namespace, cacheKeys.joinToString(":"))
        .putString("$namespace:$key", gson.toJson(cacheEntry))
        .apply()
    }
  }
  private fun removeEntryFromDisk(namespace: String, key: String){
    val cacheKeysString= sharedPreferences.getString(namespace, "")
    cacheKeysString?.let {
      if(it=="") {
        return
      }
      val keys= it.split(":").toMutableList()
      val keyToRemove= keys.indexOf(key)
      if(keyToRemove==-1){
        return
      }
      keys.removeAt(keyToRemove)
      sharedPreferences.edit()
        .putString(namespace, keys.joinToString(":"))
        .remove("$namespace:$key")
        .apply()
    }
  }
  fun addData(namespace: String, key: String, data: Any, ttl: Int){
    val cache= caches[namespace]
    cache?.let {
      val entry= CacheEntry.build(ttl, data)
      it[key]= entry
      addEntryToDisk(namespace, key, entry)
    }
  }
  fun getData(namespace: String, key: String, allowStaleData: Boolean=false): Any?{
    val cache= caches[namespace] ?: return null
    var result: Any?= null
    val cacheEntry= cache[key]
    cacheEntry?.let {
      if(allowStaleData || !it.isExpired()){
        result= it.data
      }
    }
    return result
  }
  fun getStaleData(namespace: String, key: String): Any? {
    return getData(namespace, key, allowStaleData = true)
  }
  companion object {
    const val PREF_FILE= "app.cache"
    const val TTL_INFINITE= 30 * 24 * 60
    @Volatile
    private var INSTANCE: Cache? = null
    fun initialize(context: Context, cacheDataTypes: List<CacheDataType>) {
      if(INSTANCE ==null){
        INSTANCE = Cache()
        INSTANCE?.let{
          it.sharedPreferences= context.getSharedPreferences(PREF_FILE, Context.MODE_PRIVATE)
          val migrationDone= it.sharedPreferences.getBoolean("MigrationFromV5DoneCache", false)
          if(!migrationDone){
            for(cacheDataType in cacheDataTypes){
              it.sharedPreferences.edit().remove(cacheDataType.getNamespace()).commit()
            }
            it.sharedPreferences.edit().putBoolean("MigrationFromV5DoneCache", true).commit()
          }
          for(cacheDataType in cacheDataTypes){
            it.loadCache(cacheDataType)
          }
        }
      }
    }
    fun loadCache(cacheDataType: CacheDataType){
      INSTANCE?.loadCache(cacheDataType)
    }
    fun addData(namespace: String, key: String, data: Any, ttl: Int){
      INSTANCE?.addData(namespace, key, data, ttl)
    }
    fun getData(namespace: String, key: String): Any?{
      return INSTANCE?.getData(namespace, key)
    }
    fun getStaleData(namespace: String, key: String): Any?{
      return INSTANCE?.getStaleData(namespace, key)
    }
  }
}

