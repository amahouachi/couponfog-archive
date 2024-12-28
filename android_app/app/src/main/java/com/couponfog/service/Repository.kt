package com.couponfog.service

import android.content.Context
import android.util.Log
import com.android.volley.Response
import com.couponfog.cache.Cache
import com.couponfog.cache.CacheDataType
import com.couponfog.cache.CacheEntry
import com.couponfog.model.Coupon
import com.couponfog.model.Store
import com.google.gson.JsonDeserializer

class Repository {

  abstract class CouponCacheDataType : CacheDataType {
    override fun getDeserializer(): JsonDeserializer<CacheEntry>? {
      return JsonDeserializer { json, typeOfT, context ->
        val entry = CacheEntry(0, ArrayList<Coupon>())
        val timestamp = json.asJsonObject.get("timestamp")
        val data = json.asJsonObject.get("data")
        entry.timestamp = context.deserialize<Long>(timestamp, Long::class.java)
        data.asJsonArray.forEach {
          val c: Coupon = context.deserialize(it.asJsonObject, Coupon::class.java)
          (entry.data as ArrayList<Coupon>).add(c)
        }
        entry
      }
    }
  }
  class StoreSuggestionsCacheDataType : CacheDataType {
    override fun getNamespace(): String {
      return CACHE_NAMESPACE_STORES_BY_NAME
    }
    override fun getDeserializer(): JsonDeserializer<CacheEntry>? {
      return JsonDeserializer { json, typeOfT, context ->
        val entry = CacheEntry(0, ArrayList<Store>())
        val timestamp = json.asJsonObject.get("timestamp")
        val data = json.asJsonObject.get("data")
        entry.timestamp = context.deserialize<Long>(timestamp, Long::class.java)
        data.asJsonArray.forEach {
          val s: Store = context.deserialize(it.asJsonObject, Store::class.java)
          (entry.data as ArrayList<Store>).add(s)
        }
        entry
      }
    }
  }
  class LatestCouponsCacheDataType : CouponCacheDataType(){

    override fun getNamespace(): String {
      return CACHE_NAMESPACE_LATEST_COUPONS
    }
  }
  class StoreCacheDataType : CacheDataType {
    override fun getDeserializer(): JsonDeserializer<CacheEntry>? {
      return JsonDeserializer { json, typeOfT, context ->
        val entry = CacheEntry(0, ArrayList<Store>())
        val timestamp = json.asJsonObject.get("timestamp")
        val data = json.asJsonObject.get("data")
        entry.timestamp = context.deserialize<Long>(timestamp, Long::class.java)
        entry.data = context.deserialize(data.asJsonObject, Store::class.java)
        entry
      }
    }

    override fun getNamespace(): String {
      return CACHE_NAMESPACE_STORE
    }
  }
  fun getStoreCoupons(slug: String, fetchStrategy: Int= FETCH_STRATEGY_SERVER_IF_CACHE_STALE, listener: Listener<Store>, errorListener: ErrorListener?) {
    if(fetchStrategy== FETCH_STRATEGY_SERVER_IF_CACHE_STALE) {
      val cacheData = Cache.getData(CACHE_NAMESPACE_STORE, slug)
      if (cacheData != null) {
        listener.onResponse(cacheData as Store)
        Log.d(TAG, "Data from cache for $slug")
        return
      }
    }
    Server.getStoreCoupons(slug,
      Response.Listener { data ->
        val store= Store.fromJson(data)
        listener.onResponse(store)
        Cache.addData(CACHE_NAMESPACE_STORE, slug, store, TTL_STORE_COUPONS)
        Log.d(TAG, "Data from server for $slug")
      },
      Response.ErrorListener { error ->
        if(fetchStrategy== FETCH_STRATEGY_SERVER_ONLY){
          val cacheData= Cache.getData(CACHE_NAMESPACE_STORE,slug)
          if(cacheData!=null){
            listener.onResponse(cacheData as Store)
            return@ErrorListener
          }
        }
        val cacheData= Cache.getStaleData(namespace = CACHE_NAMESPACE_STORE, key = slug)
        errorListener?.onErrorResponse(error.message?:"", cacheData)
      })
  }
  fun getLatestCoupons(fetchStrategy: Int= FETCH_STRATEGY_SERVER_IF_CACHE_STALE, listener: Listener<ArrayList<Coupon>>, errorListener: ErrorListener?) {
    if(fetchStrategy== FETCH_STRATEGY_SERVER_IF_CACHE_STALE){
      val cacheData= Cache.getData(CACHE_NAMESPACE_LATEST_COUPONS,"latest")
      if(cacheData!=null){
        listener.onResponse(cacheData as ArrayList<Coupon>)
        Log.d(TAG, "Data from cache for latest coupons")
        return
      }
    }
    Server.getLatestCoupons(
      Response.Listener { data ->
        val coupons = ArrayList<Coupon>()
        for (i in 0 until data.length()) {
          coupons.add(Coupon.fromJson(data.getJSONObject(i)))
        }
        listener.onResponse(coupons)
        Cache.addData(CACHE_NAMESPACE_LATEST_COUPONS,"latest", coupons, TTL_LATEST_COUPONS)
        Log.d(TAG, "Data from server for latest coupons")
      },
      Response.ErrorListener { error ->
        if(fetchStrategy== FETCH_STRATEGY_SERVER_ONLY){
          val cacheData= Cache.getData(CACHE_NAMESPACE_LATEST_COUPONS,"latest")
          if(cacheData!=null){
            listener.onResponse(cacheData as ArrayList<Coupon>)
            return@ErrorListener
          }
        }
        val cacheData= Cache.getStaleData(namespace = CACHE_NAMESPACE_LATEST_COUPONS, key = "latest")
        errorListener?.onErrorResponse(error.message?:"", cacheData)
      })
  }

  interface Listener<T> {
    fun onResponse(response: T)
  }

  interface ErrorListener {
    fun onErrorResponse(error: String, cacheData: Any?= null)
  }

  companion object{

    const val TAG= "Repository"
    const val TTL_STORES_BY_NAME= 2
    const val TTL_STORE_COUPONS= 15
    const val TTL_LATEST_COUPONS= 5
    const val CACHE_NAMESPACE_LATEST_COUPONS= "latestCoupons"
    const val CACHE_NAMESPACE_STORE= "store"
    const val CACHE_NAMESPACE_STORES_BY_NAME= "storesByName"

    const val FETCH_STRATEGY_SERVER_IF_CACHE_STALE= 0
    const val FETCH_STRATEGY_SERVER_ONLY=1

    @Volatile
    private var INSTANCE: Repository? = null
    fun initialize(context: Context){
      INSTANCE ?: Repository().also {
        INSTANCE = it
        Cache.initialize(context, listOf(LatestCouponsCacheDataType(), StoreSuggestionsCacheDataType(), StoreCacheDataType()))
      }
    }

    fun getStoreCoupons(slug: String, fetchStrategy: Int= FETCH_STRATEGY_SERVER_IF_CACHE_STALE, listener: Listener<Store>, errorListener: ErrorListener ) {
      INSTANCE!!.getStoreCoupons(slug, fetchStrategy, listener, errorListener)
    }

    fun getLatestCoupons(fetchStrategy: Int= FETCH_STRATEGY_SERVER_IF_CACHE_STALE, listener: Listener<ArrayList<Coupon>>, errorListener: ErrorListener ) {
      INSTANCE!!.getLatestCoupons(fetchStrategy, listener, errorListener)
    }

    /*
    fun getFavedCoupons(onSuccess: Response.Listener<JSONArray>, onError: Response.ErrorListener) {
      val url = "$serverUrl/api/clients/${Client.getId()}/favedcoupons"
      getJSONArray(url, onSuccess, onError);
    }

    fun getLatestCoupons(onSuccess: Response.Listener<JSONArray>, onError: Response.ErrorListener) {
      val url = "$serverUrl/api/coupons"
      getJSONArray(url, onSuccess, onError);
    }*/
  }
}
