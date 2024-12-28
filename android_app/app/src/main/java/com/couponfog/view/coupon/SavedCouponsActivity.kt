package com.couponfog.view.coupon

import android.os.Bundle
import android.view.View
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.couponfog.R
import com.couponfog.model.Client
import com.couponfog.service.Analytics
import kotlinx.android.synthetic.main.coupon_list.*

class SavedCouponsActivity : CouponListActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    Analytics.logSavedCouponsView()
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

  override fun retrieveCoupons(forceServerData: Boolean) {
    couponsAdapter?.apply {
      this.coupons = Client.getSavedCoupons()
      if(this.coupons.size>0){
        coupon_list.visibility= View.VISIBLE
        noCouponsTextView.visibility= View.GONE
      }else{
        noCouponsTextView.visibility= View.VISIBLE
        noCouponsTextView.text= getNoCouponsText()
        coupon_list.visibility= View.GONE
      }
    }
    setRefreshing(false)
  }

  override fun getCouponsHeader(): String {
    return "Your Saved Coupons"
  }

  override fun getCouponHeaderMode(): Int {
    return CouponsAdapter.HEADER_DISPLAY_STORE
  }

  override fun getNoCouponsText(): String {
    return resources.getString(R.string.no_saved_coupons)
  }

}