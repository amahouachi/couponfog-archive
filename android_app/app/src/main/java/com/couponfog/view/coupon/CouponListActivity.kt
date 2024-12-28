package com.couponfog.view.coupon

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.MenuItem
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.couponfog.R
import com.couponfog.model.Coupon
import com.couponfog.service.Repository
import com.google.android.material.snackbar.Snackbar
import kotlinx.android.synthetic.main.coupon_list.*

abstract class CouponListActivity : AppCompatActivity() {

  protected var couponsAdapter: CouponsAdapter? = null
  protected lateinit var couponsRecyclerView: RecyclerView
  private var swipeRefreshLayout: SwipeRefreshLayout? = null
  lateinit var serverErrorSnackbar: Snackbar

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(getLayout())
    if (hasToolbar()) {
      val toolbar = findViewById<Toolbar>(R.id.toolbar)
      setSupportActionBar(toolbar)
      supportActionBar?.setDisplayHomeAsUpEnabled(true)
    }
    couponsRecyclerView = getRecyclerView()
    swipeRefreshLayout = getSwipeRefreshLayout()
    swipeRefreshLayout?.setOnRefreshListener {
      setRefreshing(true)
      retrieveCoupons(true)
    }
    var coupons= ArrayList<Coupon>()
    savedInstanceState?.run {
      coupons= getSerializable(EXTRA_COUPONS) as ArrayList<Coupon>
      Log.d(TAG, "coupons from Bundle")
    }
    configureAdapter(coupons)
    serverErrorSnackbar= Snackbar.make(coupon_list, "Failed to retrieve data from server", Snackbar.LENGTH_INDEFINITE)
      .setAction("DISMISS") {}
    setRefreshing(true)
    retrieveCoupons()
  }

  protected fun configureAdapter(coupons: ArrayList<Coupon>) {
    couponsAdapter = CouponsAdapter(
      getCouponsHeader(),
      getCouponHeaderMode(),
      coupons,
      object : CouponsAdapter.OnItemClickListener {
        override fun onItemClick(coupon: Coupon) {
          val i = Intent(this@CouponListActivity, CouponActivity::class.java)
          i.putExtra("coupon", coupon)
          startActivity(i)
        }
      })
    couponsRecyclerView.apply {
      layoutManager = LinearLayoutManager(this@CouponListActivity)
      adapter = couponsAdapter
    }
  }

  override fun onOptionsItemSelected(item: MenuItem): Boolean {
    when (item.itemId) {
      android.R.id.home -> {
        super.onBackPressed()
      }
    }
    return super.onOptionsItemSelected(item)
  }

  override fun onResume() {
    super.onResume()
    couponsRecyclerView?.apply {
      val start = (layoutManager as LinearLayoutManager).findFirstVisibleItemPosition()
      val end = (layoutManager as LinearLayoutManager).findLastVisibleItemPosition()
      adapter?.notifyItemRangeChanged(start, end - start + 1)
    }
  }

  override fun onSaveInstanceState(outState: Bundle) {
    couponsAdapter?.let {
      outState.putSerializable(EXTRA_COUPONS, it.coupons)
    }

    // Always call the superclass so it can save the view hierarchy state
    super.onSaveInstanceState(outState)
  }

  open fun getRecyclerView(): RecyclerView{
    return coupon_list
  }
  val couponFetchListener=  object: Repository.Listener<ArrayList<Coupon>>{
    override fun onResponse(response: ArrayList<Coupon>) {
      couponsAdapter?.apply {
        this.coupons = response
        notifyDataSetChanged()
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
      if(serverErrorSnackbar.isShown){
        serverErrorSnackbar.dismiss()
      }
    }
  }
  val couponFetchErrorListener= object: Repository.ErrorListener{
    override fun onErrorResponse(error: String, cacheData: Any?) {
      couponsAdapter?.apply {
        cacheData?.let {
          this.coupons = cacheData as ArrayList<Coupon>
          notifyDataSetChanged()
          if(this.coupons.size>0){
            coupon_list.visibility= View.VISIBLE
            noCouponsTextView.visibility= View.GONE
          }else{
            noCouponsTextView.visibility= View.VISIBLE
            noCouponsTextView.text= getNoCouponsText()
            coupon_list.visibility= View.GONE
          }
        }
      }
      setRefreshing(false)
      if(!serverErrorSnackbar.isShown){
        serverErrorSnackbar.show()
      }
    }
  }

  fun setRefreshing(refreshing: Boolean){
    swipeRefreshLayout?.isRefreshing = refreshing
  }
  open fun getNoCouponsText(): String {
    return resources.getString(R.string.no_coupons)
  }

  companion object {
    const val EXTRA_COUPONS= "coupons"
    const val TAG= "CouponListAct"
  }

  abstract fun getLayout(): Int
  abstract fun hasToolbar(): Boolean
  abstract fun getSwipeRefreshLayout(): SwipeRefreshLayout?
  abstract fun retrieveCoupons(forceServerData: Boolean= false)
  abstract fun getCouponsHeader(): String
  abstract fun getCouponHeaderMode(): Int
}