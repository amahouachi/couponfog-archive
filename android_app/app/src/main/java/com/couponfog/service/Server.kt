package com.couponfog.service

import android.content.Context
import android.util.Log
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.Response
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.couponfog.app.Configuration
import com.couponfog.model.Client
import org.json.JSONArray
import org.json.JSONObject

class Server constructor(ctx: Context) {

  var context: Context = ctx.applicationContext

  val requestQueue: RequestQueue by lazy {
    Volley.newRequestQueue(context)
  }

  fun <T> addToRequestQueue(req: Request<T>) {
    requestQueue.add(req)
  }

  companion object {
    @Volatile
    private var INSTANCE: Server? = null
    private var serverUrls= ArrayList<String>()
    fun initialize(context: Context){
      INSTANCE ?: Server(context).also {
        INSTANCE = it
      }
    }
    init {
      val serverUrlList = Configuration.getProperty("server_urls")
      serverUrlList!!.split(',').shuffled().forEach {
        serverUrls.add(it)
      }
    }

    private fun selectServer(serverIndex: Int){
      if(serverIndex>0){
        val firstUrl= serverUrls[0]
        serverUrls[0]= serverUrls[serverIndex]
        serverUrls[serverIndex]= firstUrl
        Log.d("Server", "Using ${serverUrls[0]} for subsequent calls")
      }
    }
    
    private fun getJSONObject(uri: String, onSuccess: Response.Listener<JSONObject>, onError: Response.ErrorListener, currentServerIndex:Int =0) {
      val serverUrl= serverUrls[currentServerIndex]
      val jsonObjectRequest = JsonObjectRequest(
        Request.Method.GET,
        serverUrl+uri,
        null,
        Response.Listener {
          selectServer(currentServerIndex)
          onSuccess.onResponse(it)
        },
        Response.ErrorListener {
          Log.e("Server", it.cause.toString())
          if(currentServerIndex== serverUrls.size-1){
            onError.onErrorResponse(it)
          }else{
            Log.d("Server", "Bad url ${serverUrl}. Trying next one.")
            getJSONObject(uri, onSuccess, onError, currentServerIndex+1)
          }
        })
      INSTANCE!!.addToRequestQueue(jsonObjectRequest)
    }

    private fun getJSONArray(uri: String, onSuccess: Response.Listener<JSONArray>, onError: Response.ErrorListener, currentServerIndex: Int= 0 ) {
      val serverUrl= serverUrls[currentServerIndex]
      val jsonObjectRequest = JsonArrayRequest(
        Request.Method.GET,
        serverUrl+uri,
        null,
        Response.Listener {
          selectServer(currentServerIndex)
          onSuccess.onResponse(it)
        },
        Response.ErrorListener {
          Log.e("Server", it.cause.toString())
          if(currentServerIndex== serverUrls.size-1){
            onError.onErrorResponse(it)
          }else{
            Log.d("Server", "Bad url ${serverUrl}. Trying next one.")
            getJSONArray(uri, onSuccess, onError, currentServerIndex+1)
          }
        })
      INSTANCE!!.addToRequestQueue(jsonObjectRequest)
    }

    private fun postJSONObject(uri: String, obj: JSONObject, onSuccess: Response.Listener<JSONObject>, onError: Response.ErrorListener, currentServerIndex: Int= 0 ) {
      val serverUrl= serverUrls[currentServerIndex]
      val jsonObjectRequest = JsonObjectRequest(
        Request.Method.POST,
        serverUrl+uri,
        obj,
        Response.Listener {
          selectServer(currentServerIndex)
          onSuccess.onResponse(it)
        },
        Response.ErrorListener {
          if(it.networkResponse!=null){
            Log.e("Server", it.networkResponse.data?.contentToString())
          }
          if(currentServerIndex== serverUrls.size-1){
            onError.onErrorResponse(it)
          }else{
            Log.d("Server", "Bad url ${serverUrl}. Trying next one.")
            postJSONObject(uri, obj, onSuccess, onError, currentServerIndex+1)
          }
        })
      INSTANCE!!.addToRequestQueue(jsonObjectRequest)
    }

    private fun postJSONArray(uri: String, arr: JSONArray, onSuccess: Response.Listener<JSONArray>?, onError: Response.ErrorListener?, currentServerIndex: Int= 0) {
      val serverUrl= serverUrls[currentServerIndex]
      val jsonArrayRequest = JsonArrayRequest(
        Request.Method.POST,
        serverUrl+uri,
        arr,
        Response.Listener {
          selectServer(currentServerIndex)
          onSuccess?.onResponse(it)
        },
        Response.ErrorListener {
          Log.e("Server", it.cause.toString())
          if(currentServerIndex== serverUrls.size-1){
            onError?.onErrorResponse(it)
          }else{
            Log.d("Server", "Bad url ${serverUrl}. Trying next one.")
            postJSONArray(uri, arr, onSuccess, onError, currentServerIndex+1)
          }
        })
      INSTANCE!!.addToRequestQueue(jsonArrayRequest)
    }

    fun getAllStores(onSuccess: Response.Listener<JSONArray>, onError: Response.ErrorListener){
      //val url = "$serverUrl/api/stores?all=1"
      val url = "${Configuration.getProperty("web_url")}${Configuration.getProperty("stores_uri")}"
      val jsonArrayRequest = JsonArrayRequest(
        Request.Method.GET,
        url,
        null,
        onSuccess,
        onError)
      INSTANCE!!.addToRequestQueue(jsonArrayRequest)
    }

    fun getStoreCoupons(slug: String, onSuccess: Response.Listener<JSONObject>, onError: Response.ErrorListener ) {
      getJSONObject("/api/stores/$slug?target=web", onSuccess, onError)
    }

    fun getFavedCoupons(onSuccess: Response.Listener<JSONArray>, onError: Response.ErrorListener) {
      getJSONArray("/api/clients/${Client.getId()}/coupons", onSuccess, onError)
    }

    fun getLatestCoupons(onSuccess: Response.Listener<JSONArray>, onError: Response.ErrorListener) {
      getJSONArray("/api/coupons", onSuccess, onError)
    }

    fun setFavoriteStores() {
      val storeIds = JSONArray()
      for (store in Client.getFavoriteStores()) {
        storeIds.put(store.id)
      }
      postJSONArray("/api/clients/${Client.getId()}/stores", storeIds, null, null)
    }

    fun setNotificationSettings( notificationEnabled: Int, token: String, onSuccess: Response.Listener<JSONObject>, onError: Response.ErrorListener ) {
      val notificationSettings = JSONObject()
      notificationSettings.put("enabled", notificationEnabled)
      notificationSettings.put("token", token)
      postJSONObject("/api/clients/${Client.getId()}/notification", notificationSettings, onSuccess, onError)
    }
  }

}
