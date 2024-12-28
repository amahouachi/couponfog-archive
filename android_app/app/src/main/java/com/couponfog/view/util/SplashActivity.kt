package com.couponfog.view.util

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import androidx.appcompat.app.AppCompatActivity
import com.couponfog.R
import com.couponfog.view.MainActivity
import com.couponfog.view.coupon.FavoriteCouponsActivity


class SplashActivity : AppCompatActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.splashscreen)
    var target: String? = "main"
    if (null != intent.extras) {
      target = intent.extras?.get("target") as String?
      if (target == null) target = "main"
    }

    val handler = Handler()
    handler.postDelayed({
      var targetIntent: Intent? = null
      when (target) {
        "fav-coupons" -> {
          targetIntent = Intent(this@SplashActivity, FavoriteCouponsActivity::class.java)
        }
        else -> {
          targetIntent = Intent(this@SplashActivity, MainActivity::class.java)
        }
      }
      targetIntent.putExtras(intent)
      startActivity(targetIntent)
      finish()
    }, 3000)

  }

}
