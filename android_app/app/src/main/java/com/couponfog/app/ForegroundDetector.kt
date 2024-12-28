package com.couponfog.app

import android.app.Activity
import android.app.Application
import android.os.Bundle
import java.util.*

class ForegroundDetector : Application.ActivityLifecycleCallbacks {

  private val listeners = ArrayList<Listener>()
  internal var numStarted = 0

  interface Listener {
    fun foreground()
    fun background()
  }

  private fun notifyForeground() {
    for (i in listeners.indices) {
      listeners[i].foreground()
    }
  }

  private fun notifyBackground() {
    for (i in listeners.indices) {
      listeners[i].background()
    }
  }

  override fun onActivityCreated(activity: Activity, bundle: Bundle?) {

  }

  override fun onActivityStarted(activity: Activity) {
    if (numStarted == 0) {
      notifyForeground()
    }
    numStarted++
  }

  override fun onActivityResumed(activity: Activity) {

  }

  override fun onActivityPaused(activity: Activity) {

  }

  override fun onActivityStopped(activity: Activity) {
    numStarted--
    if (numStarted == 0) {
      notifyBackground()
    }
  }

  override fun onActivitySaveInstanceState(activity: Activity, bundle: Bundle?) {

  }

  override fun onActivityDestroyed(activity: Activity) {

  }

  companion object {

    private val instance = ForegroundDetector()

    fun init(app: Application) {
      app.registerActivityLifecycleCallbacks(instance)
    }

    fun addListener(listener: Listener) {
      instance.listeners.add(listener)
    }

    fun removeListener(listener: Listener) {
      instance.listeners.remove(listener)
    }

    val isForeground: Boolean
      get() = instance.numStarted > 0

    val isBackground: Boolean
      get() = instance.numStarted == 0
  }
}