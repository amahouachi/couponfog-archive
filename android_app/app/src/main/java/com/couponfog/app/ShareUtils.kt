package com.couponfog.app

import android.content.Context
import android.content.Intent
import android.net.Uri
import com.couponfog.BuildConfig
import com.couponfog.model.Client
import com.couponfog.model.Coupon
import com.couponfog.model.Store
import java.net.URLEncoder

class ShareUtils {

  companion object{
    fun sendFeedback(context: Context) {
      val supportEmail= Configuration.getProperty("support_email")
      val subject= "[v" + BuildConfig.VERSION_NAME + "] Feedback about CouponFog App"
      val emailIntent = Intent(Intent.ACTION_SENDTO, Uri.fromParts("mailto", supportEmail, null))
      emailIntent.putExtra(
        Intent.EXTRA_SUBJECT,
        subject

      )
      context.startActivity(Intent.createChooser(emailIntent, "Send email..."))
    }

    fun shareApp(context: Context) {
      val referrer= URLEncoder.encode( "medium=appshare&uid=" + Client.getId())
      val appUrl= "${Configuration.getProperty("app_url")}&referrer=$referrer"
      val webUrl= Configuration.getProperty("web_url")
      val title= "Check out Couponfog app!"
      val body= "Find coupons and offers for your favorite stores using Couponfog app\n\n$appUrl\n\nYou can also visit Couponfog website here : \n$webUrl"
      shareTextContent(context, title, body)
    }
    fun shareStore(context: Context, store: Store){
      val title= "${store.name} Coupons & Promo Codes"
      val url= "${Configuration.getProperty("share_url")}?s=${store.id}"
      val body= "Check out ${store.name} offers found using Couponfog app \n\n$url\n\nCouponfog App : ${Configuration.getProperty("app_url")}"
      shareTextContent(context, title, body)
    }
    fun shareCoupon(context: Context, coupon: Coupon){
      val title= "${coupon.storeName} - ${coupon.name}"
      val url= "${Configuration.getProperty("share_url")}?s=${coupon.storeId}&c=${coupon.id}"
      val body= "Check out this offer for ${coupon.storeName} :\n\n${coupon.name}\n$url\n\nCouponfog App : ${Configuration.getProperty("app_url")}"
      shareTextContent(context, title, body)
    }

    fun shareTextContent(context: Context, title: String, body: String){
      val sendIntent = Intent()
      sendIntent.action = Intent.ACTION_SEND
      sendIntent.putExtra(Intent.EXTRA_SUBJECT, title)
      sendIntent.putExtra(
        Intent.EXTRA_TEXT,
        body
      )
      sendIntent.type = "text/plain"
      context.startActivity(sendIntent)

    }

  }

}