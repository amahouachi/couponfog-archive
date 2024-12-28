package com.couponfog.service

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.Color
import android.media.RingtoneManager
import android.os.Build
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.core.content.ContextCompat
import com.android.volley.Response
import com.couponfog.R
import com.couponfog.broadcast.NotificationActionHandler
import com.couponfog.model.Coupon
import com.couponfog.model.Notification
import com.couponfog.view.MainActivity
import com.couponfog.view.coupon.CouponActivity
import com.couponfog.view.notification.CouponNotificationActivity
import com.couponfog.view.notification.NotificationsActivity
import com.couponfog.view.store.StoreActivity
import com.google.firebase.iid.FirebaseInstanceId
import com.google.firebase.messaging.FirebaseMessaging
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import com.google.firebase.iid.InstanceIdResult
import com.google.android.gms.tasks.OnSuccessListener
import androidx.core.content.ContextCompat.getSystemService
import android.icu.lang.UCharacter.GraphemeClusterBreak.T




class PushService : FirebaseMessagingService() {


  override fun onMessageReceived(remoteMessage: RemoteMessage) {
    val notification: Notification? = Notification.fromData(remoteMessage.data)
    notification?.let {
      it.save()
      if(NotificationManagerCompat.from(this).areNotificationsEnabled()){
        displayNotification(it)
/*
        // if notification is image
          Fresco.initialize(this)
          val imageRequest = ImageRequest.fromUri(it.image)
          val imagePipeline = Fresco.getImagePipeline()
          val dataSource = imagePipeline.fetchDecodedImage(imageRequest, null)
          dataSource.subscribe(
            object: BaseBitmapDataSubscriber() {
              override fun onNewResultImpl(bitmap: Bitmap?) {
                displayNotification(it, NOTIFICATION_TYPE_IMAGE, bitmap)
              }
              override fun onFailureImpl(dataSource: DataSource<CloseableReference<CloseableImage>>) {
                displayNotification(it, NOTIFICATION_TYPE_TEXT)
              }
            },
            Executors.newSingleThreadExecutor())
          }
*/
      }
    }
  }
  override fun onNewToken(token: String) {
    Server.setNotificationSettings(
      1,
      token,
      Response.Listener {
      },
      Response.ErrorListener {
      })
  }
  private fun displayNotification(notification: Notification){
    val notificationManagerCompat= NotificationManagerCompat.from(this)
    val builder= NotificationCompat.Builder(this, CHANNEL_ID)

    //create a channel if needed
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      if(notificationManagerCompat.getNotificationChannel(CHANNEL_ID)==null){
        NotificationChannel( CHANNEL_ID, CHANNEL_NAME, NotificationManager.IMPORTANCE_HIGH)
          .also {
            it.enableLights(true)
            it.lightColor = primaryColorRGB
            notificationManagerCompat.createNotificationChannel(it)
          }
      }
    }

    //setup options
    var bigText= notification.body
    if(notification.type==Notification.TYPE_COUPON_ALERT_FULL && notification.coupons!!.size>1){
      val couponNames= notification.coupons?.map { coupon: Coupon ->
        coupon.name
      }
      couponNames?.forEach {
        bigText+= "\n" + it
      }
    }
    setTextNotificationOptions(builder, bigText)
    //main intent
    val intent: Intent
    val contentIntent: PendingIntent
    val actions= ArrayList<Action>()
    if(notification.type==Notification.TYPE_COUPON_ALERT_FULL) {
      if (notification.coupons?.size == 1) {
        intent = Intent(this, CouponActivity::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
        intent.putExtra(CouponActivity.EXTRA_COUPON, notification.coupons!![0])
        intent.putExtra(NotificationActionHandler.EXTRA_NOTIFICATION_ID, notification.id)
      } else {
        intent = Intent(this, CouponNotificationActivity::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
        intent.putExtra(CouponNotificationActivity.EXTRA_NOTIFICATION, notification)
        intent.putExtra(NotificationActionHandler.EXTRA_NOTIFICATION_ID, notification.id)
      }
      contentIntent= PendingIntent.getActivity(this, notification.id, intent, PendingIntent.FLAG_UPDATE_CURRENT)
      actions.add(Action(R.drawable.baseline_keyboard_arrow_right_24, "Show", contentIntent))
      //save action intent
      val saveCouponIntent = Intent(this, NotificationActionHandler::class.java).apply {
        action = NotificationActionHandler.ACTION_SAVE_COUPON
        putExtra(NotificationActionHandler.EXTRA_NOTIFICATION_ID, notification.id)
        putExtra(NotificationActionHandler.EXTRA_COUPONS, notification.coupons)
      }
      val saveCouponPendingIntent: PendingIntent = PendingIntent.getBroadcast(
        this,
        notification.id,
        saveCouponIntent,
        PendingIntent.FLAG_UPDATE_CURRENT
      )
      actions.add(Action(R.drawable.baseline_star_border_24, "Use Later", saveCouponPendingIntent))
    }else if(notification.type==Notification.TYPE_COUPON_ALERT_SUMMARY){
      intent = Intent(this, StoreActivity::class.java)
      intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
      intent.putExtra(StoreActivity.EXTRA_STORE, notification.store)
      intent.putExtra(NotificationActionHandler.EXTRA_NOTIFICATION_ID, notification.id)
      contentIntent= PendingIntent.getActivity(this, notification.id, intent, PendingIntent.FLAG_UPDATE_CURRENT)
      actions.add(Action(R.drawable.baseline_keyboard_arrow_right_24, "Show", contentIntent))
    }else{
      intent = Intent(this, MainActivity::class.java)
      intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
      contentIntent = PendingIntent.getActivity(this, notification.id, intent, PendingIntent.FLAG_UPDATE_CURRENT)
    }
    val settingsIntent = Intent().apply {
      action = "android.settings.APP_NOTIFICATION_SETTINGS"
      putExtra("app_package", packageName)
      putExtra("app_uid", applicationInfo.uid)
      putExtra("android.provider.extra.APP_PACKAGE", packageName)
    }
    val settingsPendingIntent: PendingIntent = PendingIntent.getActivity(this, notification.id, settingsIntent, PendingIntent.FLAG_UPDATE_CURRENT)
    actions.add( Action( R.drawable.baseline_settings_applications_24, "Options", settingsPendingIntent ) )
    setCommonNotificationOptions(builder, notification.title, notification.body,contentIntent, actions)

    val systemNotification= builder.build()
    systemNotification.flags.or(android.app.Notification.FLAG_SHOW_LIGHTS)
    notificationManagerCompat.notify(notification.id, systemNotification)
    notificationManagerCompat.notify(SUMMARY_NOTIFICATION_ID, createSummaryNotification())
    MainActivity.handler?.let {
      val msg = it.obtainMessage()
      msg.what = MainActivity.UPDATE_NOTIFICATION_BADGE
      it.sendMessage(msg)
    }
    Analytics.logNotificationReceived(notification)
  }
  private fun setImageNotificationOptions(builder: NotificationCompat.Builder, image: Bitmap){
    builder.setLargeIcon(image)
      .setStyle(NotificationCompat.BigPictureStyle()
        .bigPicture(image)
        .bigLargeIcon(null))
  }
  private fun setTextNotificationOptions(builder: NotificationCompat.Builder, bigBody: String){
    builder
      .setStyle(
        NotificationCompat.BigTextStyle()
          .bigText(bigBody)
      )
  }
  private fun setCommonNotificationOptions(builder: NotificationCompat.Builder, title: String, body: String, contentIntent: PendingIntent, actions: ArrayList<Action>){
    val defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION)
    val primaryColorRGB = ContextCompat.getColor(this, R.color.colorPrimary)
    builder
      .setContentTitle(title)
      .setContentText(body)
      .setCategory(NotificationCompat.CATEGORY_PROMO)
      .setAutoCancel(true)
      .setSound(defaultSoundUri)
      .setContentIntent(contentIntent)
      .setGroup(NOTIFICATION_GROUP)
      .setPriority(NotificationCompat.PRIORITY_HIGH)
      .setLights(primaryColorRGB, 1200, 2200)
      .setGroupSummary(false)
      .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
      .setSmallIcon(R.drawable.ic_stat_name).color = primaryColorRGB
     actions.forEach {
       builder.addAction(it.iconId, it.text, it.intent)
     }
  }
  private fun createSummaryNotification(): android.app.Notification{
    val intent = Intent(this, NotificationsActivity::class.java)
    intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
    val summaryIntent = PendingIntent.getActivity(this, SUMMARY_NOTIFICATION_ID, intent, PendingIntent.FLAG_UPDATE_CURRENT)
    return NotificationCompat.Builder(this, CHANNEL_ID)
      .setSmallIcon(R.drawable.ic_stat_name)
      .setColor(primaryColorRGB)
      .setAutoCancel(true)
      .setStyle(NotificationCompat.InboxStyle())
      .setGroup(NOTIFICATION_GROUP)
      .setGroupSummary(true)
      .setContentIntent(summaryIntent)
      .build()
  }

  companion object {
    private const val TAG = "PushService"
    val primaryColorRGB = Color.argb(255,0,131,143)
    const val SUMMARY_NOTIFICATION_ID= 2020
    const val CHANNEL_ID= "1000"
    const val CHANNEL_NAME= "New Coupons"
    const val NOTIFICATION_GROUP= "NEW_COUPONS"

    fun enableFirebaseMessaging(){
      val fm= FirebaseMessaging.getInstance()
      if(!fm.isAutoInitEnabled){
        fm.isAutoInitEnabled= true
      }else{
        FirebaseInstanceId.getInstance().instanceId.addOnSuccessListener { instanceIdResult ->
          val token = instanceIdResult.token
          Server.setNotificationSettings(
            1,
            token,
            Response.Listener {
            },
            Response.ErrorListener {
            })

        }
      }
    }
  }
  class Action constructor(val iconId: Int, val text: String, val intent: PendingIntent)
}
