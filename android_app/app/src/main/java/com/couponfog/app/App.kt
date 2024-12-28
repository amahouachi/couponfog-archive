package com.couponfog.app

import android.app.Application
import android.util.Log
import com.couponfog.R
import com.couponfog.model.Client
import com.couponfog.service.*
import com.google.android.gms.ads.MobileAds

class App() : Application() {

  override fun onCreate() {
    super.onCreate()
    val TAG= "App"
    MobileAds.initialize(this, getString(R.string.admob_account_id))
    Configuration.initialize(this)
    DB.initialize(this)
    Server.initialize(this)
    Client.initialize()
    AppRater.initialize(this)
    Repository.initialize(this)
    Autocomplete.initialize()
    Analytics.initialize(this)
    DB.recordAppLaunch()
    ForegroundDetector.init(this)
    ForegroundDetector.addListener(object : ForegroundDetector.Listener {
      override fun foreground() {
        Log.d(TAG, "App is foreground")
      }
      override fun background() {
        Log.d(TAG, "App is background")
      }
    })
  }

}


