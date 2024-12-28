package com.couponfog.view

import android.Manifest
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.location.Location
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Message
import android.util.Log
import android.view.MenuItem
import android.view.View
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.core.view.GravityCompat
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.arlib.floatingsearchview.FloatingSearchView
import com.arlib.floatingsearchview.suggestions.model.SearchSuggestion
import com.couponfog.R
import com.couponfog.app.AdFreeUsage
import com.couponfog.app.AppRater
import com.couponfog.app.Configuration
import com.couponfog.model.Client
import com.couponfog.model.Store
import com.couponfog.service.Analytics
import com.couponfog.service.Autocomplete
import com.couponfog.service.DB
import com.couponfog.service.Repository
import com.couponfog.view.coupon.*
import com.couponfog.view.notification.NotificationsActivity
import com.couponfog.view.store.FavoriteStoresActivity
import com.couponfog.view.store.StoreActivity
import com.couponfog.view.store.StoreSuggestion
import com.couponfog.view.util.SettingsActivity
import com.google.android.gms.ads.AdListener
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.InterstitialAd
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.android.material.navigation.NavigationView
import kotlinx.android.synthetic.main.activity_main.*
import java.util.*
import kotlin.collections.ArrayList


class MainActivity : CouponListActivity(), NavigationView.OnNavigationItemSelectedListener {

  private lateinit var lastQuery: String
  private lateinit var fusedLocationClient: FusedLocationProviderClient
  private var interstitialAd: InterstitialAd? = null

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    configureNavigationView()
    configureSearchView()
    val preferences = getSharedPreferences(AppRater.PREFS_NAME, Context.MODE_PRIVATE)
    val appLaunches = preferences.getLong(AppRater.KEY_NAME__APP_LAUNCHES, 1)
    if(appLaunches==1L){
      showFirstUseDialog()
    }
    //AdFreeUsage.addCredit(0, 3)
  }

  override fun onResume() {
    super.onResume()
    updateNotificationBadge()
    toggleOnNotificationCallback(this, true)
    Analytics.logHomeView()
  }

  override fun onPause() {
    super.onPause()
    toggleOnNotificationCallback(null, false)

  }
  override fun onStart() {
    /*AdFreeUsage.consumeViewCredit()
    if (!AdFreeUsage.hasCredit()) {
      setupInterstitialAd()
    }*/
    super.onStart()
  }

  private fun setupInterstitialAd() {
    interstitialAd = InterstitialAd(this).also {
      it.adUnitId = getString(R.string.admob_interstitial_main_unit_id)
      val builder= AdRequest.Builder()
      val adListener: AdListener = object : AdListener() {
        override fun onAdClosed() {
          super.onAdClosed()
          AdFreeUsage.addCredit(Configuration.getRemotePropertyInt(CouponActivity.KEY_AD_CLOSE_CREDIT_MINUTES), Configuration.getRemotePropertyInt(
            CouponActivity.KEY_AD_CLOSE_CREDIT_VIEWS
          ))
          Log.d("AdListener", "AdClose called")
        }
        override fun onAdLoaded() {
          super.onAdLoaded()
          interstitialAd?.show()
        }
        override fun onAdLeftApplication() {
          super.onAdLeftApplication()
          AdFreeUsage.addCredit(Configuration.getRemotePropertyInt(CouponActivity.KEY_AD_CLICK_CREDIT_MINUTES), Configuration.getRemotePropertyInt(
            CouponActivity.KEY_AD_CLICK_CREDIT_VIEWS
          ))
          Analytics.logAdClick()
          Log.d("AdListener", "AdLeftApp called")
        }
      }
      it.adListener= adListener
      builder.addKeyword("Coupons")
      builder.addKeyword("Promotions")
      builder.addKeyword("Discounts")
      builder.addKeyword("Deals")
      if(Client.getFavoriteStores().size>0){
        for(s in Client.getFavoriteStores()){
          builder.addKeyword(s.name)
        }
      }
      if(ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED){
        fusedLocationClient.lastLocation
          .addOnSuccessListener { location : Location? ->
            if(location!=null){
              builder.setLocation(location)
              it.loadAd(builder.build())
            }else{
              it.loadAd(builder.build())
            }
          }
          .addOnFailureListener { _ : Exception ->
            it.loadAd(builder.build())
          }
      }else{
        it.loadAd(builder.build())
      }
    }
  }

  fun setSelectedStore(store: Store) {
    val i = Intent(this, StoreActivity::class.java)
    i.putExtra("store", store)
    startActivity(i)
  }

  private fun configureNavigationView() {
    nav_view.setNavigationItemSelectedListener(this as NavigationView.OnNavigationItemSelectedListener)
    nav_view.bringToFront()
  }

  private fun configureSearchView() {
    StoreSuggestion.loadHistory(this)
    floating_search_view.attachNavigationDrawerToMenuButton(drawer_layout)
    floating_search_view.setOnBindSuggestionCallback { suggestionView, leftIcon, textView, item, itemPosition ->
      val storeSuggestion = item as StoreSuggestion
      storeSuggestion.decorateView(this, leftIcon, textView, floating_search_view.query)
    }
    floating_search_view.setOnQueryChangeListener { oldQuery, newQuery ->
      //get suggestions based on newQuery
      lastQuery = newQuery
      var suggestions = ArrayList<SearchSuggestion>()
      if (newQuery.isEmpty()) {
        floating_search_view.swapSuggestions(StoreSuggestion.getHistory(5))
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
        (searchSuggestion as StoreSuggestion).addToHistory(this@MainActivity)
        setSelectedStore(searchSuggestion.store!!)
        nav_view.setCheckedItem(R.id.menu_home)
      }

      override fun onSearchAction(currentQuery: String?) {}
    })
    floating_search_view.setOnFocusChangeListener(object : FloatingSearchView.OnFocusChangeListener {
      override fun onFocus() {
        floating_search_view.swapSuggestions(StoreSuggestion.getHistory(5))
      }

      override fun onFocusCleared() {
        floating_search_view.setSearchBarTitle("")
      }
    })
    floating_search_view.setOnHomeActionClickListener {
      floating_search_view.setSearchBarTitle("")
    }
    floating_search_view.setOnOverflowMenuInflated {
      updateNotificationBadge()
    }
    floating_search_view.setOnMenuItemClickListener { item: MenuItem? ->
      val intent= Intent(this, NotificationsActivity::class.java)
      startActivity(intent)
    }

  }

  private fun updateNotificationBadge(){
    if(floating_search_view.currentMenuItems!=null && floating_search_view.currentMenuItems.size>0){
      val notificationButton= floating_search_view.currentMenuItems[0].actionView
      //val badgeDrawable = BadgeDrawable.create(this)
      //BadgeUtils.attachBadgeDrawable(badgeDrawable, notificationButton, FrameLayout(this));
      val badgeTextView= notificationButton.findViewById<TextView>(R.id.notification_badge)
      val notificationsCount= DB.getNewNotificationsCount()
      if(notificationsCount>0){
        badgeTextView.visibility= View.VISIBLE
        badgeTextView.text= "$notificationsCount"
      }else{
        badgeTextView.visibility= View.GONE
      }
    }

  }

  override fun onNavigationItemSelected(menuItem: MenuItem): Boolean {
    when (menuItem.itemId) {
      R.id.menu_home -> {
        floating_search_view.setSearchText("")
      }
      R.id.menu_favedstores -> {
        val i = Intent(this, FavoriteStoresActivity::class.java)
        startActivity(i)
      }
      R.id.menu_favedcoupons -> {
        val i = Intent(this, FavoriteCouponsActivity::class.java)
        startActivity(i)
      }
      R.id.menu_savedcoupons -> {
        val i = Intent(this, SavedCouponsActivity::class.java)
        startActivity(i)
      }
      R.id.menu_settings -> {
        val i = Intent(this, SettingsActivity::class.java)
        startActivity(i)
      }
      else -> {
      }
    }
    drawer_layout.closeDrawer(GravityCompat.START)
    return true
  }
  private fun deviceHasProblemWithBackgroundTasks(): Boolean{
    val brand= Build.MANUFACTURER.toLowerCase(Locale.US)
    val brands= arrayOf("xiaomi","asus","vivo","huawei","oppo","oneplus","redmi","samsung","letv")
    return brands.contains(brand)
  }
  private fun showFirstUseDialog(){
    var message= "We hope you will save money with Couponfog. When you fave a store, you will be notified when new coupons are available for that store."
    if(!deviceHasProblemWithBackgroundTasks()){
      message+= " Since ${Build.MANUFACTURER} phones are known to have problems with notifications, make sure that \"auto-start\" and notifications are enabled for this app in your device's settings."
    }else{
      message+= " Make sure that notifications are enabled for this app in your device's settings."
    }
    val alertDialog = MaterialAlertDialogBuilder(this)
    alertDialog.setMessage(message)
    alertDialog.setTitle("Welcome")
    alertDialog.setNegativeButton("Got it") {dialog, which -> dialog.cancel()}

    alertDialog.create().show()
  }

  override fun getLayout(): Int {
    return R.layout.activity_main
  }

  override fun hasToolbar(): Boolean {
    return false
  }

  override fun getSwipeRefreshLayout(): SwipeRefreshLayout? {
    return swipeRefreshLayout
  }

  override fun retrieveCoupons(forceServerData: Boolean) {
    var fetchStrategy: Int= Repository.FETCH_STRATEGY_SERVER_IF_CACHE_STALE
    if(forceServerData){
      fetchStrategy= Repository.FETCH_STRATEGY_SERVER_ONLY
    }
    Repository.getLatestCoupons(
      fetchStrategy,
      couponFetchListener,
      couponFetchErrorListener
    )
  }

  override fun getCouponsHeader(): String {
    return "Latest Coupons"
  }

  override fun getCouponHeaderMode(): Int {
    return CouponsAdapter.HEADER_DISPLAY_STORE
  }
  companion object{
    private var INSTANCE: MainActivity?= null
    const val UPDATE_NOTIFICATION_BADGE= 777
    var handler: Handler?= null
    fun toggleOnNotificationCallback(instance: MainActivity?, enabled: Boolean){
      INSTANCE= instance
      if(enabled){
        handler= object: Handler() {
          override fun handleMessage(msg: Message?) {
            if (msg?.what == UPDATE_NOTIFICATION_BADGE) {
              INSTANCE?.updateNotificationBadge()
            }
            super.handleMessage(msg)
          }
        }
      }else{
        handler= null
      }
    }
  }
}

