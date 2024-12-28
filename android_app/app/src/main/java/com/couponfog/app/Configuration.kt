package com.couponfog.app

import android.content.Context
import android.util.Log
import com.couponfog.R
import com.google.firebase.remoteconfig.FirebaseRemoteConfig
import com.google.firebase.remoteconfig.FirebaseRemoteConfigSettings
import java.util.*

/**
 * Created by ahmed on 23/10/2016.
 */

class Configuration private constructor(context: Context) {

  private val properties = Properties()
  private val CONFIG_FILE = "config.properties"
  private lateinit var remoteConfig: FirebaseRemoteConfig

  init {
    try {
      properties.load(context.assets.open(CONFIG_FILE))
      remoteConfig = FirebaseRemoteConfig.getInstance()
      val configSettings = FirebaseRemoteConfigSettings.Builder().setMinimumFetchIntervalInSeconds(60).build()
      remoteConfig.setConfigSettingsAsync(configSettings)
      remoteConfig.setDefaultsAsync(R.xml.remote_config_defaults)
      fetchRemoteConfig()
    } catch (e: Exception) {
      e.stackTrace
    }
  }

  fun fetchRemoteConfig(){
    remoteConfig.fetchAndActivate().addOnCompleteListener {
      if (it.isSuccessful) {
        val updated = it.result
        Log.d("Configuration", "Config params updated: $updated")
      } else {
        Log.e("Configuration", "Config fetch failed")
      }
    }
  }

  companion object {
    private var instance: Configuration? = null

    fun initialize(context: Context) {
      if (instance == null) {
        instance = Configuration(context)
      }
    }

    fun getProperty(key: String): String? {
      return instance!!.properties.getProperty(key)
    }
    fun getRemotePropertyString(key: String): String {
      return instance!!.remoteConfig.getString(key)
    }
    fun getRemotePropertyLong(key: String): Long {
      return instance!!.remoteConfig.getLong(key)
    }
    fun getRemotePropertyInt(key: String): Int {
      return getRemotePropertyLong(key).toInt()
    }
    fun getRemotePropertyBoolean(key: String): Boolean {
      return instance!!.remoteConfig.getBoolean(key)
    }
  }


}