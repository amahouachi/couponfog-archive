package com.couponfog.service

import android.content.Context
import com.android.volley.Response
import com.couponfog.cache.Cache
import com.couponfog.model.Store

class Autocomplete(val stores: ArrayList<Store>){
  var index= HashMap<String,ArrayList<Int>>()

  init {
    stores.forEachIndexed { i, store ->
      val prefixes= getPrefixes(store.name.toLowerCase())
      for(p in prefixes){
        if(index.containsKey(p)){
          index[p]?.add(i)
        }else{
          index.put(p, arrayListOf(i))
        }
      }
    }
  }
  fun getPrefixes(s: String): ArrayList<String>{
    val prefixes= ArrayList<String>()
    for(i in s.indices){
      prefixes.add(s.substring(0, i+1))
    }
    return prefixes
  }
  fun search(query: String, limit: Int= 6): ArrayList<Store>{
    val matches= ArrayList<Store>()
    val allMatchingStores= ArrayList<Store>()
    if(index.containsKey(query.toLowerCase())){
      val matchingIds= index[query]
      for (i in matchingIds!!.indices){
        allMatchingStores.add(stores.get(matchingIds[i]))
      }
      for(i in allMatchingStores.indices){
        for(j in i+1 until allMatchingStores.size){
          if(allMatchingStores[i].popularity<allMatchingStores[j].popularity){
            val tmpStore= allMatchingStores[i]
            allMatchingStores[i]= allMatchingStores[j]
            allMatchingStores[j]= tmpStore
          }
        }
        matches.add(allMatchingStores[i])
        if(matches.size==limit){
          break
        }
      }
    }
    return matches
  }

  companion object{
    private var INSTANCE: Autocomplete? = null

    fun initialize(){
      if(INSTANCE!=null){
        return
      }
      Server.getAllStores(
        Response.Listener { data ->
          val stores= ArrayList<Store>()
          for (i in 0 until data.length()) {
            val s= Store.fromJson(data.getJSONObject(i))
            stores.add(s)
          }
          INSTANCE ?: Autocomplete(stores).also {
            INSTANCE = it
          }
        },
        Response.ErrorListener {
          //INSTANCE= Autocomplete(ArrayList(0))
        }
      )
    }
    fun search(query: String, limit: Int= 6): ArrayList<Store>{
      if(INSTANCE!=null){
        return INSTANCE!!.search(query, limit);
      }else{
        initialize()
        return ArrayList(0)
      }
    }
  }
}