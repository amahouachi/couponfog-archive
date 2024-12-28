package com.couponfog.view.store

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.text.Html
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.android.volley.Response
import com.arlib.floatingsearchview.FloatingSearchView
import com.arlib.floatingsearchview.suggestions.model.SearchSuggestion
import com.couponfog.R
import com.couponfog.model.Client
import com.couponfog.model.Store
import com.couponfog.service.Analytics
import com.couponfog.service.Autocomplete
import com.couponfog.service.Server
import kotlinx.android.synthetic.main.activity_favorite_stores.*
import kotlinx.android.synthetic.main.activity_favorite_stores.floating_search_view
import kotlinx.android.synthetic.main.activity_main.*

class FavoriteStoresActivity : AppCompatActivity() {

  private lateinit var storesAdapter: FavoriteStoresAdapter
  private lateinit var lastQuery: String

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_favorite_stores)
    configureSearchView()
    setupStoresAdapter()
    Analytics.logFavoriteStoresView()
  }

  private fun setupStoresAdapter() {
    storesAdapter = FavoriteStoresAdapter(
      Client.getFavoriteStores(),
      object : FavoriteStoresAdapter.OnItemClickListener {
        override fun onItemClick(store: Store) {
          val i = Intent(this@FavoriteStoresActivity, StoreActivity::class.java)
          i.putExtra("store", store)
          startActivity(i)
        }
      }
    )
    store_list.apply {
      setHasFixedSize(true)
      layoutManager = LinearLayoutManager(this@FavoriteStoresActivity)
      adapter = storesAdapter
    }
  }

  private fun configureSearchView() {
    floating_search_view.setOnBindSuggestionCallback { suggestionView, leftIcon, textView, item, itemPosition ->
      val storeSuggestion = item as StoreSuggestion
      val textColor = "#000000"
      val textLight = "#787878"
      textView.setTextColor(Color.parseColor(textColor))
      val text = storeSuggestion.body
        ?.replaceFirst(
          floating_search_view.query,
          "<font color=\"" + textLight + "\">" + floating_search_view.query + "</font>"
        )
      textView.text = Html.fromHtml(text)
    }
    floating_search_view.setOnQueryChangeListener { oldQuery, newQuery ->
      //get suggestions based on newQuery
      lastQuery = newQuery
      var suggestions = ArrayList<SearchSuggestion>()
      if (newQuery.isEmpty()) {
        floating_search_view.swapSuggestions(suggestions)
        return@setOnQueryChangeListener
      }
      val stores= Autocomplete.search(newQuery)
      for(store in stores){
        var suggestion = StoreSuggestion(store)
        if (StoreSuggestion.isHistory(suggestion)) {
          suggestion.setIsHistory(true)
        }
        suggestions.add(suggestion)
      }
      floating_search_view.swapSuggestions(suggestions)
    }
    floating_search_view.setOnSearchListener(object : FloatingSearchView.OnSearchListener {
      override fun onSuggestionClicked(searchSuggestion: SearchSuggestion) {
        floating_search_view.clearSearchFocus()
        val store = (searchSuggestion as StoreSuggestion).store!!
        if (!Client.isFavoriteStore(store.id)) {
          Client.addFavoriteStore(store)
          storesAdapter.stores = Client.getFavoriteStores()
          storesAdapter.notifyDataSetChanged()
        }
      }

      override fun onSearchAction(currentQuery: String?) {}
    })
    floating_search_view.setOnFocusChangeListener(object : FloatingSearchView.OnFocusChangeListener {
      override fun onFocus() {
      }

      override fun onFocusCleared() {
        floating_search_view.setSearchBarTitle("")
      }
    })
    floating_search_view.setOnHomeActionClickListener {
      floating_search_view.setSearchBarTitle("")
      super.onBackPressed()
    }

  }

  override fun onResume() {
    storesAdapter.notifyDataSetChanged()
    super.onResume()
  }
}
