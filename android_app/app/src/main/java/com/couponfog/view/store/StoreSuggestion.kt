package com.couponfog.view.store

import android.content.Context
import android.graphics.Color
import android.os.Parcel
import android.os.Parcelable
import android.text.Html
import android.widget.ImageView
import android.widget.TextView
import androidx.core.content.res.ResourcesCompat
import com.arlib.floatingsearchview.suggestions.model.SearchSuggestion
import com.arlib.floatingsearchview.util.Util
import com.couponfog.R
import com.couponfog.cache.Cache
import com.couponfog.cache.CacheDataType
import com.couponfog.cache.CacheEntry
import com.couponfog.model.Store
import com.google.gson.JsonDeserializer

class StoreSuggestion : SearchSuggestion {

  lateinit var store: Store
  var isHistory = false

  constructor(store: Store) {
    this.store = store
  }

  constructor(source: Parcel) {
    this.store = source.readSerializable() as Store
    this.isHistory = source.readInt() != 0
  }

  override fun getBody(): String? {
    return store.name
  }

  fun setIsHistory(isHistory: Boolean) {
    this.isHistory = isHistory
  }

  override fun describeContents(): Int {
    return 0
  }

  override fun writeToParcel(dest: Parcel, flags: Int) {
    dest.writeSerializable(store)
    dest.writeInt(if (isHistory) 1 else 0)
  }
  fun decorateView(context: Context, leftIcon: ImageView, textView: TextView, query: String){
    val textLight = "#000000"
    val textColor = "#787878"
    if (isHistory) {
      leftIcon.setImageDrawable(
        ResourcesCompat.getDrawable(
          context.resources,
          R.drawable.ic_history_black_24dp, null
        )
      )
      Util.setIconColor(leftIcon, Color.parseColor(textColor))
      leftIcon.alpha = .36f
    } else {
      leftIcon.alpha = 0.0f
      leftIcon.setImageDrawable(null)
    }

    textView.setTextColor(Color.parseColor(textColor))
    body?.let {
      textView.text = it
      val queryIndex= it.toLowerCase().indexOf(query.toLowerCase())
      if(queryIndex!=null && queryIndex!=-1){
        val beforeQ= it.substring(0, queryIndex)
        val Q= it.substring(queryIndex, queryIndex+query.length)
        val afterQ= it.substring(query.length, it.length)
        val text= "$beforeQ<font color=\"$textLight\">$Q</font>$afterQ"
        textView.text = Html.fromHtml(text)
      }
    }
  }
  fun addToHistory(context: Context) {
    if (!isHistory) {
      isHistory = true
      if (history.size == MAX_SUGGESTED_STORE_HISTORY) {
        history.removeAt(0)
      }
      history.add(this)
    } else {
      for (i in 0 until history.size) {
        val s = history[i]
        if (s.body == body) {
          history.removeAt(i)
          break
        }
      }
      history.add(this)
    }
    val storesHistory= ArrayList<Store>(history.size)
    for(suggestion in history){
      storesHistory.add(suggestion.store)
    }
    /*
    val sharedPref = context.getSharedPreferences("com.couponfog.HISTORY", Context.MODE_PRIVATE).edit()
    sharedPref.putString("STORE_SUGGESTIONS", Gson().toJson(storesHistory))
    sharedPref.apply()
    */
    Cache.addData(CACHE_NAMESPACE, CACHE_KEY, storesHistory, CACHE_TTL)

  }

  companion object CREATOR : Parcelable.Creator<StoreSuggestion> {
    private val history = ArrayList<StoreSuggestion>()
    private const val MAX_SUGGESTED_STORE_HISTORY = 4
    const val CACHE_NAMESPACE = "storeSuggestions"
    const val CACHE_KEY = "suggestions"
    const val CACHE_TTL = Cache.TTL_INFINITE

    override fun createFromParcel(parcel: Parcel): StoreSuggestion {
      return StoreSuggestion(parcel)
    }

    override fun newArray(size: Int): Array<StoreSuggestion?> {
      return arrayOfNulls(size)
    }

    fun loadHistory(context: Context) {
      /*
      val sharedPref = context.getSharedPreferences("com.couponfog.HISTORY", Context.MODE_PRIVATE)
      val itemType = object : TypeToken<List<Store>>() {}.type
      val stores=
        Gson().fromJson<ArrayList<Store>>(sharedPref.getString("STORE_SUGGESTIONS", "[]") ?: "[]", itemType)
          ?: ArrayList()
          */
      Cache.loadCache(StoreSuggestionCacheDataType())
      var stores= Cache.getData(CACHE_NAMESPACE, CACHE_KEY)
      if(stores!=null){
        for(s in (stores as ArrayList<Store>)){
          val ss= StoreSuggestion(s)
          ss.addToHistory(context)
        }
      }
    }
    fun isHistory(store: StoreSuggestion): Boolean {
      if (history.size == 0)
        return false
      for (i in 0..history.size - 1) {
        val s = history[i]
        if (s.body == store.body)
          return true
      }
      return false
    }

    fun getHistory(max: Int): List<StoreSuggestion> {
      if (history.size <= max) {
        return history.toMutableList().asReversed()
      }
      var to = history.size
      var from = to - max
      return history.toMutableList().subList(from, to).asReversed()
    }
  }
}
class StoreSuggestionCacheDataType : CacheDataType {
  override fun getNamespace(): String {
    return StoreSuggestion.CACHE_NAMESPACE
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
