package com.couponfog.view.notification

import android.app.NotificationManager
import android.content.Context
import android.os.Bundle
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.couponfog.R
import com.couponfog.broadcast.NotificationActionHandler
import com.couponfog.model.Notification
import com.couponfog.service.Analytics
import com.couponfog.service.PushService
import com.couponfog.view.coupon.CouponListActivity
import com.couponfog.view.coupon.CouponsAdapter
import kotlinx.android.synthetic.main.coupon_list.*

class CouponNotificationActivity : CouponListActivity() {
  override fun getSwipeRefreshLayout(): SwipeRefreshLayout? {
    return swipeRefreshLayout
  }

  lateinit var notification: Notification

  override fun onCreate(savedInstanceState: Bundle?) {
    var bundle= savedInstanceState
    if(bundle==null){
      bundle= intent.extras
    }
    bundle?.apply {
      notification= this[EXTRA_NOTIFICATION] as Notification
      val notificationId = this.getInt(NotificationActionHandler.EXTRA_NOTIFICATION_ID, -1)
      if (notificationId != -1) {
        NotificationActionHandler.cancelNotifications(notificationId, this@CouponNotificationActivity)
        if(notification.store!=null){
          Analytics.logNotificationOpen(notification.store!!.name)
        }
      }
    }
    super.onCreate(savedInstanceState)
  }

  override fun getLayout(): Int {
    return R.layout.activity_favorite_coupons
  }

  override fun hasToolbar(): Boolean {
    return true
  }

  override fun retrieveCoupons(forceServerData: Boolean) {
    couponsAdapter?.coupons = notification.coupons!!
    setRefreshing(false)
  }

  override fun getCouponsHeader(): String {
    return "[${notification.getDisplayDate()}] ${notification.title}: ${notification.body}"
  }

  override fun getCouponHeaderMode(): Int {
    return CouponsAdapter.HEADER_DISPLAY_DISCOUNT
  }
  companion object{
    const val EXTRA_NOTIFICATION= "notification"
  }


}
