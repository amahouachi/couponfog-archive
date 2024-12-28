package com.couponfog.view.coupon

import android.content.Intent
import android.view.MenuItem
import android.view.View
import android.widget.Toast
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.android.volley.Response
import com.couponfog.R
import com.couponfog.model.Coupon
import com.couponfog.service.Server
import com.couponfog.view.MainActivity
import kotlinx.android.synthetic.main.coupon_list.*

class FavoriteCouponsActivity : CouponListActivity() {

  override fun onOptionsItemSelected(item: MenuItem): Boolean {
    when (item.itemId) {
      android.R.id.home -> {
        leaveActivity()
        return true
      }
    }
    return super.onOptionsItemSelected(item)
  }

  override fun onBackPressed() {
    leaveActivity()
  }

  private fun leaveActivity() {
    val intent = Intent(this, MainActivity::class.java)
    startActivity(intent)
  }

  override fun getLayout(): Int {
    return R.layout.activity_favorite_coupons
  }

  override fun hasToolbar(): Boolean {
    return true
  }

  override fun getSwipeRefreshLayout(): SwipeRefreshLayout? {
    return swipeRefreshLayout
  }

  override fun getCouponsHeader(): String {
    return "Coupons From Your Favorite Stores"
  }

  override fun getCouponHeaderMode(): Int {
    return CouponsAdapter.HEADER_DISPLAY_STORE
  }

  override fun retrieveCoupons(forceServerData: Boolean) {
    couponsRecyclerView?.visibility = View.INVISIBLE
    if (!swipeRefreshLayout!!.isRefreshing) {
      swipeRefreshLayout?.isRefreshing = true
    }
    Server.getFavedCoupons(
      Response.Listener { data ->
        val coupons = ArrayList<Coupon>()
        for (i in 0 until data.length()) {
          val coupon = Coupon.fromJson(data.getJSONObject(i))
          if (coupon != null) {
            coupons.add(coupon)
          }
        }
        couponsAdapter?.apply {
          this.coupons = coupons
          notifyDataSetChanged()
        }
        coupon_list.visibility = View.VISIBLE
        swipeRefreshLayout.isRefreshing = false
      },
      Response.ErrorListener { error ->
        swipeRefreshLayout.isRefreshing = false
        coupon_list.visibility = View.VISIBLE
        Toast.makeText(this@FavoriteCouponsActivity, error.message, Toast.LENGTH_LONG).show()
      })
  }

}