package com.couponfog.view.store

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import androidx.browser.customtabs.CustomTabsIntent
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.couponfog.R
import com.couponfog.app.AdFreeUsage
import com.couponfog.app.Configuration
import com.couponfog.app.ShareUtils
import com.couponfog.broadcast.NotificationActionHandler
import com.couponfog.model.Client
import com.couponfog.model.Coupon
import com.couponfog.model.Notification
import com.couponfog.model.Store
import com.couponfog.service.Analytics
import com.couponfog.service.Repository
import com.couponfog.util.UrlUtil
import com.couponfog.view.MainActivity
import com.couponfog.view.coupon.CouponActivity
import com.couponfog.view.coupon.CouponListActivity
import com.couponfog.view.coupon.CouponsAdapter
import com.couponfog.view.notification.CouponNotificationActivity
import com.google.android.material.snackbar.Snackbar
import kotlinx.android.synthetic.main.coupon_list.*

class StoreActivity : CouponListActivity() {

  private var store: Store?= null
  private var menu: Menu? = null
  private var couponId: String?= null

  override fun onCreate(savedInstanceState: Bundle?) {
    var bundle= savedInstanceState
    if(bundle==null){
      bundle= intent.extras
    }
    if(bundle!=null){
      store= bundle[EXTRA_STORE] as Store
/*
    }else{
      intent.data?.let {
        val params = it.pathSegments
        if(params.size>1){
          store= Store("${System.currentTimeMillis()}","Store", params[1], ArrayList())
          if(it.fragment!=null){
            couponId= it.fragment?.substring(1)
          }
        }
      }
*/
    }
    super.onCreate(savedInstanceState)
    store?.let {
      supportActionBar?.title= it.name
      Analytics.logStoreView(it)
      bundle?.apply {
        val notificationId = this.getInt(NotificationActionHandler.EXTRA_NOTIFICATION_ID, -1)
        if (notificationId != -1) {
          NotificationActionHandler.cancelNotifications(notificationId, this@StoreActivity)
          Analytics.logNotificationOpen(it.name)
        }
      }
    }
  }

  override fun onSaveInstanceState(outState: Bundle) {
    outState.putSerializable(EXTRA_STORE, store)
    super.onSaveInstanceState(outState)
  }
  override fun onOptionsItemSelected(menuItem: MenuItem): Boolean {
    when (menuItem.itemId) {
      android.R.id.home -> {
        if(isTaskRoot){
          val parentIntent = Intent(this, MainActivity::class.java)
          parentIntent.flags.or(Intent.FLAG_ACTIVITY_BROUGHT_TO_FRONT).or(Intent.FLAG_ACTIVITY_SINGLE_TOP).or(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT)
          startActivity(parentIntent)
          finish()
        }else{
          super.onBackPressed()
        }
      }
      R.id.faveStore -> {
        store?.let {
          if (!Client.isFavoriteStore(it.id)) {
            Client.addFavoriteStore(it)
            menuItem.icon = getDrawable(R.drawable.baseline_favorite_white_24)
            menuItem.icon.setTint(resources.getColor(android.R.color.holo_red_light))
          } else {
            Client.removeFavoriteStore(it)
            menuItem.icon = getDrawable(R.drawable.baseline_favorite_border_white_24)
          }
        }
      }
      R.id.storeShare -> {
        ShareUtils.shareStore(this, store!!)
      }
      R.id.openStore -> {
        val intentBuilder = CustomTabsIntent.Builder()
        intentBuilder.setStartAnimations(this, android.R.anim.slide_in_left, android.R.anim.slide_out_right)
        intentBuilder.setExitAnimations(
          this, android.R.anim.slide_in_left,
          android.R.anim.slide_out_right
        )
        intentBuilder.setToolbarColor(resources.getColor(R.color.colorPrimary))
        intentBuilder.build().launchUrl(this, Uri.parse(UrlUtil.getOutUrl(store!!.id)))
      }
    }
    return super.onOptionsItemSelected(menuItem)
  }

  override fun onCreateOptionsMenu(optionsMenu: Menu?): Boolean {
    menu = optionsMenu
    menuInflater.inflate(R.menu.store_menu, optionsMenu)
    store?.let {
      val menuItem = optionsMenu?.getItem(0)
      if(menuItem!=null){
        if (Client.isFavoriteStore(it.id)) {
          menuItem.icon = getDrawable(R.drawable.baseline_favorite_white_24)
          menuItem.icon.setTint(resources.getColor(android.R.color.holo_red_light))
        }
      }
    }
    return true
  }

  override fun getLayout(): Int {
    return R.layout.activity_store
  }

  override fun hasToolbar(): Boolean {
    return true
  }

  override fun getSwipeRefreshLayout(): SwipeRefreshLayout? {
    return swipeRefreshLayout
  }

  private fun setUIData(){
    store?.let {
      supportActionBar?.title= it.name
      if (menu!=null && Client.isFavoriteStore(it.id)) {
        menu?.getItem(0)?.icon= getDrawable(R.drawable.baseline_favorite_white_24)
        menu?.getItem(0)?.icon?.setTint(resources.getColor(android.R.color.holo_red_light))
      }
    }

  }
  override fun retrieveCoupons(forceServerData: Boolean) {
    var fetchStrategy: Int= Repository.FETCH_STRATEGY_SERVER_IF_CACHE_STALE
    if(forceServerData){
      fetchStrategy= Repository.FETCH_STRATEGY_SERVER_ONLY
    }
    Repository.getStoreCoupons(
      store!!.slug,
      fetchStrategy,
      object : Repository.Listener<Store> {
        override fun onResponse(response: Store) {
          store= response
          setUIData()
          couponFetchListener.onResponse(response.coupons)
          if(couponId!=null){
            redirectToSelectedCoupon()
          }
        }
      },
      object: Repository.ErrorListener{
        override fun onErrorResponse(error: String, cacheData: Any?) {
          if(cacheData!=null){
            store= cacheData as Store
            setUIData()
            couponFetchErrorListener.onErrorResponse(error, store?.coupons)
            if(couponId!=null){
              redirectToSelectedCoupon()
            }
          }else{
            couponFetchErrorListener.onErrorResponse(error, cacheData)
          }
        }

      }
      )
  }
  fun redirectToSelectedCoupon(){
    store?.coupons?.let {
      for(coupon in it){
        if(coupon.id==couponId){
          val i = Intent(this, CouponActivity::class.java)
          i.putExtra("coupon", coupon)
          startActivity(i)
          couponId= null
          return
        }
      }
      Snackbar.make(coupon_list, "Coupon expired or removed", Snackbar.LENGTH_LONG)
        .setAction("Dismiss") {}
        .show()
    }
  }

  override fun getCouponsHeader(): String {
    return "${store?.name} Coupons"
  }

  override fun getCouponHeaderMode(): Int {
    return CouponsAdapter.HEADER_DISPLAY_DISCOUNT
  }

  override fun getNoCouponsText(): String {
    return resources.getString(R.string.no_store_coupons).toString()
  }

  companion object{
    const val EXTRA_STORE= "store"
    const val TAG= " StoreAct"
  }

}