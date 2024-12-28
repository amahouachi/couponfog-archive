package com.couponfog.broadcast

import android.app.NotificationManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import com.couponfog.model.Client
import com.couponfog.model.Coupon
import com.couponfog.service.Analytics
import com.couponfog.service.PushService

class NotificationActionHandler : BroadcastReceiver() {
  override fun onReceive(context: Context?, intent: Intent?) {
    if(context!=null){
      intent?.let {
        val notificationId = it.extras?.getInt(EXTRA_NOTIFICATION_ID, -1)
        Log.d(TAG, it.extras.toString())
        if (notificationId != -1) {
          val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
          Log.d(TAG, "Canceling notification id : $notificationId")
          notificationManager.cancel(notificationId!!)
          if(notificationManager.activeNotifications.size==1){
            notificationManager.cancel(PushService.SUMMARY_NOTIFICATION_ID)
          }
        }
        when (it.action) {
          ACTION_SAVE_COUPON -> {
            var coupons: ArrayList<Coupon> = it.extras?.get(EXTRA_COUPONS) as ArrayList<Coupon>
            if(coupons==null){coupons= ArrayList()}
            for (c in coupons){
              Client.addSavedCoupon(c)
            }
            Log.d(TAG, "Saved coupon")
          }
          else -> {
            Log.d(TAG, "Unknown action : ${it.action}")
          }
        }
      }
    }
  }

  companion object {
    const val ACTION_SAVE_COUPON = "com.couponfog.android.intent.action.SAVE_COUPON"
    const val EXTRA_NOTIFICATION_ID = "notificationId"
    const val EXTRA_COUPONS = "coupons"
    private const val TAG = "NotifActionHandler"

    fun cancelNotifications(notificationId: Int, context: Context){
      val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
      notificationManager.cancel(notificationId)
      if(notificationManager.activeNotifications.size==1){
        notificationManager.cancel(PushService.SUMMARY_NOTIFICATION_ID)
      }
    }
  }

}