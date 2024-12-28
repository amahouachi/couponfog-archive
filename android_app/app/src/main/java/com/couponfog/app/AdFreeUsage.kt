package com.couponfog.app

class AdFreeUsage {
  companion object {
    private var timeCredit = 0
    private var viewCredit = 0
    const val KEY_ADS_DISABLED= "ads_disabled"

    private fun now(): Int {
      return (System.currentTimeMillis() / 1000).toInt()
    }

    fun addCredit(minutes: Int, views: Int) {
      timeCredit = now() + (minutes * 60)
      viewCredit = views
    }

    fun hasCredit(): Boolean {
      return (viewCredit > 0 || timeCredit > now() || Configuration.getRemotePropertyBoolean(
        KEY_ADS_DISABLED))
    }

    fun consumeViewCredit() {
      if (viewCredit > 0) viewCredit--
    }
  }
}