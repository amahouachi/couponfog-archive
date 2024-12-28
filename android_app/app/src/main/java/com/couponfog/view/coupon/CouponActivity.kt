package com.couponfog.view.coupon

import android.Manifest
import android.app.NotificationManager
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.location.Location
import android.net.Uri
import android.os.Bundle
import android.provider.CalendarContract
import android.text.Html
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.browser.customtabs.CustomTabsIntent
import androidx.core.content.ContextCompat
import com.couponfog.R
import com.couponfog.app.AdFreeUsage
import com.couponfog.app.Configuration
import com.couponfog.app.ShareUtils
import com.couponfog.broadcast.NotificationActionHandler
import com.couponfog.model.Client
import com.couponfog.model.Coupon
import com.couponfog.service.Analytics
import com.couponfog.service.PushService
import com.couponfog.util.UrlUtil
import com.google.android.gms.ads.*
import com.google.android.gms.ads.formats.MediaView
import com.google.android.gms.ads.formats.NativeAdOptions
import com.google.android.gms.ads.formats.UnifiedNativeAd
import com.google.android.gms.ads.formats.UnifiedNativeAdView
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import kotlinx.android.synthetic.main.activity_coupon.*
import java.util.*


class CouponActivity : AppCompatActivity() {

  private lateinit var fusedLocationClient: FusedLocationProviderClient
  //private var interstitialAd: InterstitialAd? = null
  private var currentNativeAd: UnifiedNativeAd?= null
  private var isSaved = false
  private lateinit var coupon: Coupon
  private var currentLocation: Location?= null

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_coupon)
    fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
    var bundle= savedInstanceState
    if(bundle==null){
      bundle= intent.extras
    }
    bundle?.apply {
      coupon= this[EXTRA_COUPON] as Coupon
      isSaved = if(this[EXTRA_SAVED]!=null){
        this[EXTRA_SAVED] as Boolean
      }else{
        Client.isSavedCoupon(coupon.id)
      }
      buildUI(coupon)
      Analytics.logCouponView(coupon)
      val notificationId = this.getInt(NotificationActionHandler.EXTRA_NOTIFICATION_ID, -1)
      if (notificationId != -1) {
        Analytics.logNotificationOpen(coupon.storeName)
        val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.cancel(notificationId)
        if(notificationManager.activeNotifications.size==1){
          notificationManager.cancel(PushService.SUMMARY_NOTIFICATION_ID)
        }
      }
    }
  }

  override fun onSaveInstanceState(outState: Bundle) {
    outState.putBoolean(EXTRA_SAVED, isSaved)
    outState.putSerializable(EXTRA_COUPON, coupon)
    super.onSaveInstanceState(outState)
  }

  override fun onStart() {
/*
    AdFreeUsage.consumeViewCredit()
    if (!AdFreeUsage.hasCredit()) {
      setupInterstitialAd()
    }
*/
    try{
      setupAdvancedAd()
    }catch (e: Exception){
    }
    super.onStart()
  }

  private fun populateUnifiedNativeAdView(nativeAd: UnifiedNativeAd, adView: UnifiedNativeAdView) {
    // You must call destroy on old ads when you are done with them,
    // otherwise you will have a memory leak.
    currentNativeAd?.destroy()
    currentNativeAd = nativeAd
    // Set the media view.
    adView.mediaView = adView.findViewById<MediaView>(R.id.ad_media)

    // Set other ad assets.
    adView.headlineView = adView.findViewById(R.id.ad_headline)
    adView.bodyView = adView.findViewById(R.id.ad_body)
    adView.callToActionView = adView.findViewById(R.id.ad_call_to_action)
    adView.iconView = adView.findViewById(R.id.ad_app_icon)
    adView.priceView = adView.findViewById(R.id.ad_price)
    adView.starRatingView = adView.findViewById(R.id.ad_stars)
    adView.storeView = adView.findViewById(R.id.ad_store)
    adView.advertiserView = adView.findViewById(R.id.ad_advertiser)

    // The headline and media content are guaranteed to be in every UnifiedNativeAd.
    (adView.headlineView as TextView).text = nativeAd.headline
    adView.mediaView.setMediaContent(nativeAd.mediaContent)

    // These assets aren't guaranteed to be in every UnifiedNativeAd, so it's important to
    // check before trying to display them.
    if (nativeAd.body == null) {
      adView.bodyView.visibility = View.INVISIBLE
    } else {
      adView.bodyView.visibility = View.VISIBLE
      (adView.bodyView as TextView).text = nativeAd.body
    }

    if (nativeAd.callToAction == null) {
      adView.callToActionView.visibility = View.INVISIBLE
    } else {
      adView.callToActionView.visibility = View.VISIBLE
      (adView.callToActionView as Button).text = nativeAd.callToAction
    }

    if (nativeAd.icon == null) {
      adView.iconView.visibility = View.GONE
    } else {
      (adView.iconView as ImageView).setImageDrawable(
        nativeAd.icon.drawable)
      adView.iconView.visibility = View.VISIBLE
    }

    if (nativeAd.price == null) {
      adView.priceView.visibility = View.INVISIBLE
    } else {
      adView.priceView.visibility = View.VISIBLE
      (adView.priceView as TextView).text = nativeAd.price
    }

    if (nativeAd.store == null) {
      adView.storeView.visibility = View.INVISIBLE
    } else {
      adView.storeView.visibility = View.VISIBLE
      (adView.storeView as TextView).text = nativeAd.store
    }

    if (nativeAd.starRating == null) {
      adView.starRatingView.visibility = View.INVISIBLE
    } else {
      (adView.starRatingView as RatingBar).rating = nativeAd.starRating!!.toFloat()
      adView.starRatingView.visibility = View.VISIBLE
    }

    if (nativeAd.advertiser == null) {
      adView.advertiserView.visibility = View.INVISIBLE
    } else {
      (adView.advertiserView as TextView).text = nativeAd.advertiser
      adView.advertiserView.visibility = View.VISIBLE
    }

    // This method tells the Google Mobile Ads SDK that you have finished populating your
    // native ad view with this native ad.
    adView.setNativeAd(nativeAd)

    // Get the video controller for the ad. One will always be provided, even if the ad doesn't
    // have a video asset.
    val vc = nativeAd.videoController

    // Updates the UI to say whether or not this ad has a video asset.
    if (vc.hasVideoContent()) {
      // Create a new VideoLifecycleCallbacks object and pass it to the VideoController. The
      // VideoController will call methods on this object when events occur in the video
      // lifecycle.
      vc.videoLifecycleCallbacks = object : VideoController.VideoLifecycleCallbacks() {
        override fun onVideoEnd() {
          // Publishers should allow native ads to complete video playback before
          // refreshing or replacing them with another ad in the same UI location.
          super.onVideoEnd()
        }
      }
    }
  }


  private fun setupAdvancedAd(){
    val builder = AdLoader.Builder(this, getString(R.string.admob_native_coupon_unit_id))

    builder.forUnifiedNativeAd { unifiedNativeAd ->
      // OnUnifiedNativeAdLoadedListener implementation.
      val adView = layoutInflater
        .inflate(R.layout.ad_unified, null) as UnifiedNativeAdView
      populateUnifiedNativeAdView(unifiedNativeAd, adView)
      ad_frame.removeAllViews()
      ad_frame.addView(adView)
    }

    val videoOptions = VideoOptions.Builder()
      .setStartMuted(true)
      .build()

    val adOptions = NativeAdOptions.Builder()
      .setVideoOptions(videoOptions)
      .build()

    builder.withNativeAdOptions(adOptions)

    val adLoader = builder.withAdListener(object : AdListener() {
      override fun onAdLeftApplication() {
        super.onAdLeftApplication()
        Analytics.logAdClick()
        Log.d("AdListener", "AdLeftApp called")
      }
    }).build()
    adLoader.loadAd(AdRequest.Builder().build())
  }
/*
  private fun setupInterstitialAd() {
    interstitialAd = InterstitialAd(this).also {
      it.adUnitId = getString(R.string.admob_interstitial_coupon_unit_id)
      val builder= AdRequest.Builder()
      val adListener: AdListener = object : AdListener() {
        override fun onAdClosed() {
          super.onAdClosed()
          AdFreeUsage.addCredit(Configuration.getRemotePropertyInt(KEY_AD_CLOSE_CREDIT_MINUTES), Configuration.getRemotePropertyInt(
            KEY_AD_CLOSE_CREDIT_VIEWS))
          Log.d("AdListener", "AdClose called")
        }
        override fun onAdLoaded() {
          super.onAdLoaded()
          interstitialAd?.show()
        }
        override fun onAdLeftApplication() {
          super.onAdLeftApplication()
          AdFreeUsage.addCredit(Configuration.getRemotePropertyInt(KEY_AD_CLICK_CREDIT_MINUTES), Configuration.getRemotePropertyInt(
            KEY_AD_CLICK_CREDIT_VIEWS))
          Analytics.logAdClick()
          Log.d("AdListener", "AdLeftApp called")
        }
      }
      it.adListener= adListener
      builder.addKeyword(coupon.storeName)
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
*/

  private fun buildUI(coupon: Coupon) {
    val toolbar = findViewById<Toolbar>(R.id.toolbar)
    setSupportActionBar(toolbar)
    supportActionBar?.setDisplayHomeAsUpEnabled(true)
    supportActionBar?.title = coupon.getDiscountString()
    var theCouponName= coupon.name
    if(coupon.hasDetails()){
      theCouponName+= "*"
    }
    couponName.text = theCouponName
    couponCode.text = coupon.code
    if (coupon.type == "code") {
      couponCode.visibility = View.VISIBLE
    } else {
      couponCode.visibility = View.GONE
    }
    storeName.text = coupon.storeName
    val expires = coupon.getExpirationLabel()
    if (expires == "") {
      couponEndDate.visibility = View.INVISIBLE
    } else {
      couponEndDate.text = expires
    }
    buttonShop.setOnClickListener { v ->
      AdFreeUsage.addCredit(Configuration.getRemotePropertyInt(KEY_SHOP_TRIP_CREDIT_MINUTES), Configuration.getRemotePropertyInt(
        KEY_SHOP_TRIP_CREDIT_VIEWS))
      Analytics.logShopTrip(coupon)
      //Setting custom enter/exit animations
      val intentBuilder = CustomTabsIntent.Builder()
      intentBuilder.setStartAnimations(this, android.R.anim.slide_in_left, android.R.anim.slide_out_right)
      intentBuilder.setExitAnimations(
        this, android.R.anim.slide_in_left,
        android.R.anim.slide_out_right
      )
      intentBuilder.setToolbarColor(resources.getColor(R.color.colorPrimary))

      //Open the Custom Tab
      intentBuilder.build().launchUrl(this, Uri.parse(UrlUtil.getOutUrl(coupon.storeId, coupon.id)))
    }
    couponCode.setOnClickListener { v ->
      val clipboard = getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
      val clip = ClipData.newPlainText("CouponCode", couponCode.text)
      clipboard.setPrimaryClip(clip)
      val toast = Toast.makeText(this, "Copied!", Toast.LENGTH_SHORT)
      toast.show()
    }
    if (!coupon.hasDetails()) {
      couponDetails.visibility = View.GONE
      couponDetailsDivider.visibility= View.GONE
    } else {
      couponDetails.visibility = View.VISIBLE
      couponDetailsDivider.visibility= View.VISIBLE
      couponDetails.text = "*"+Html.fromHtml(coupon.details)
    }

  }

  override fun onOptionsItemSelected(item: MenuItem): Boolean {
    when (item.itemId) {
      android.R.id.home -> {
        super.onBackPressed()
      }
      R.id.couponSave -> {
        val menu = toolbar.menu
        if (isSaved) {
          isSaved = false
          Client.removeSavedCoupon(coupon.id)
          menu?.getItem(0)?.icon = getDrawable(R.drawable.baseline_star_border_white_24)
        } else {
          isSaved = true
          Client.addSavedCoupon(coupon)
          menu?.getItem(0)?.icon = getDrawable(R.drawable.baseline_star_white_24)
        }
      }
      R.id.couponShare -> {
        ShareUtils.shareCoupon(this, coupon)
        Analytics.logCouponShare(coupon)
      }
    }
    return super.onOptionsItemSelected(item)
  }

  override fun onCreateOptionsMenu(menu: Menu?): Boolean {
    menuInflater.inflate(R.menu.coupon_menu, menu)
    if (isSaved) {
      menu?.getItem(0)?.icon = getDrawable(R.drawable.baseline_star_white_24)
    }
    return true
  }

  public override fun onDestroy() {
    buttonShop?.setOnClickListener(null)
    //buttonRevealCode?.setOnClickListener(null)
/*
    interstitialAd?.adListener = null
    interstitialAd = null
*/
    currentNativeAd?.destroy()
    super.onDestroy()
  }
  companion object{
    const val EXTRA_COUPON= "coupon"
    const val EXTRA_SAVED= "saved"
    const val TAG= "CouponAct"
    const val KEY_AD_CLICK_CREDIT_MINUTES= "ad_click_credit_minutes"
    const val KEY_AD_CLICK_CREDIT_VIEWS= "ad_click_credit_views"
    const val KEY_AD_CLOSE_CREDIT_MINUTES= "ad_close_credit_minutes"
    const val KEY_AD_CLOSE_CREDIT_VIEWS= "ad_close_credit_views"
    const val KEY_SHOP_TRIP_CREDIT_MINUTES= "shop_trip_credit_minutes"
    const val KEY_SHOP_TRIP_CREDIT_VIEWS= "shop_trip_credit_views"
  }
}
