package com.couponfog.app


import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.net.Uri
import android.text.format.DateUtils
import android.util.Log
import com.couponfog.BuildConfig

class AppRater {

  private val preferences: SharedPreferences

  private constructor(context: Context) {
    preferences = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    val editor = preferences.edit()

    val appLaunches = preferences.getLong(KEY_NAME__APP_LAUNCHES, 0) + 1
    editor.putLong(KEY_NAME__APP_LAUNCHES, appLaunches)


    editor.apply()

    val dontShowAgain = preferences.getBoolean(KEY_NAME__DONT_SHOW_AGAIN, false)
    val dontShowTillNextUpdate = preferences.getBoolean(KEY_NAME__DONT_SHOW_TILL_NEXT_UPDATE, false)
    val appLaunchesAfterLater = preferences.getLong(KEY_NAME__MIN_APP_LAUNCHES, 0)

    //1. never show after dont_show_again
    if (dontShowAgain) {
      return
    }

    //2. user asked to show later and havent yet launched app x more times
    if (appLaunchesAfterLater > appLaunches) {
      return
    }

    // if we are here, we allow showing rate dialogs
    isReadyToShow = true

  }

  companion object {

    val PREFS_NAME = "APP_RATER"
    val KEY_NAME__APP_LAUNCHES = "APP_LAUNCHES"
    val KEY_NAME__DATE_FIRST_LAUNCH = "DATE_FIRST_LAUNCHED"
    val KEY_NAME__MIN_APP_LAUNCHES = "MIN_APP_LAUNCHES"
    val KEY_NAME__DONT_SHOW_AGAIN = "DONT_SHOW_AGAIN"
    val KEY_NAME__DONT_SHOW_TILL_NEXT_UPDATE = "DONT_SHOW_TILL_NEXT_UPDATE"
    val KEY_NAME__VERSION_CODE = "VERSION_CODE"

    private var minLaunchesAfterShowLater: Long = 7

    var isReadyToShow = false

    private var instance: AppRater? = null

    fun initialize(context: Context) {
      if (instance == null) {
        instance = AppRater(context)
      }
    }

    fun setMinLaunchesAfterShowLater(minLaunchesAfterShowLater: Long) {
      Companion.minLaunchesAfterShowLater = minLaunchesAfterShowLater
    }

    fun rate(context: Context) {
      try {
        val url = "market://details?id=" + BuildConfig.APPLICATION_ID
        context.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
      } catch (e: ActivityNotFoundException) {
        Log.d("AppRater", "No Play store installed")
      }
      doNotShowAgain()
    }

    fun doNotShowAgain() {
      instance!!.preferences.edit().putBoolean(KEY_NAME__DONT_SHOW_AGAIN, true).apply()
      isReadyToShow = false
    }

    fun sendFeedback(context: Context) {
      ShareUtils.sendFeedback(context)
      doNotShowTillNextUpdate()
    }

    fun doNotShowTillNextUpdate() {
      instance!!.preferences.edit().putBoolean(KEY_NAME__DONT_SHOW_TILL_NEXT_UPDATE, true).apply()
      isReadyToShow = false
    }

    fun showLater() {
      val appLaunches = instance!!.preferences.getLong(KEY_NAME__APP_LAUNCHES, 0)
      instance!!.preferences.edit()
        .putLong(KEY_NAME__MIN_APP_LAUNCHES, appLaunches + minLaunchesAfterShowLater)
        .apply()
      isReadyToShow = false
    }
  }
}