package com.couponfog.view.coupon

import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.amulyakhare.textdrawable.TextDrawable
import com.amulyakhare.textdrawable.util.ColorGenerator
import com.couponfog.R
import com.couponfog.model.Client
import com.couponfog.model.Coupon
import kotlinx.android.synthetic.main.coupon_list_item.view.*


class CouponsAdapter(
  var header: String,
  var headerDisplayMode: Int,
  var coupons: ArrayList<Coupon>,
  val clickListener: OnItemClickListener
) :
  RecyclerView.Adapter<RecyclerView.ViewHolder>() {

  companion object {
    const val ITEM_TYPE_HEADER = 0
    const val ITEM_TYPE_CONTENT = 1

    const val HEADER_DISPLAY_STORE = 0
    const val HEADER_DISPLAY_DISCOUNT = 1

  }

  class HeaderViewHolder(val headerView: TextView) : RecyclerView.ViewHolder(headerView)
  class CouponViewHolder(var couponView: androidx.cardview.widget.CardView) :
    RecyclerView.ViewHolder(couponView) {

    fun bind(coupon: Coupon, headerDisplayMode: Int, clickListener: OnItemClickListener) {
      val generator = ColorGenerator.MATERIAL
      val logoColor = generator.getColor(coupon.storeName)
      val drawable = TextDrawable.builder().buildRound("${coupon.storeName.first()}", logoColor)
      couponView.storeLogo.setImageDrawable(drawable)
      couponView.couponName.text = coupon.name
      if (headerDisplayMode == HEADER_DISPLAY_DISCOUNT) {
        couponView.storeName.text = coupon.getDiscountString()
      } else {
        couponView.storeName.text = coupon.storeName
      }
      val expires = coupon.getExpirationLabel()
      if (expires == "") {
        couponView.couponEndDate.visibility = View.GONE
      } else {
        couponView.couponEndDate.visibility = View.VISIBLE
        couponView.couponEndDate.text = expires
      }
      couponView.couponType.text = coupon.type
      if (coupon.type == "code") {
        couponView.couponType.setTextColor(couponView.resources.getColor(R.color.colorCouponTypeCode))
      } else {
        couponView.couponType.setTextColor(couponView.resources.getColor(R.color.colorCouponTypeSale))

      }
      couponView.setOnClickListener({ clickListener.onItemClick(coupon) })
      val couponSaveView: ImageView = couponView.couponSave
      val savedCouponTintColor = couponSaveView.context.resources.getColor(R.color.colorSaveCouponIcon)
      if (Client.isSavedCoupon(coupon.id)) {
        couponSaveView.setImageDrawable(couponSaveView.context.getDrawable(R.drawable.baseline_star_black_24))
        couponSaveView.drawable.setTint(savedCouponTintColor)
      } else {
        couponSaveView.setImageDrawable(couponSaveView.context.getDrawable(R.drawable.baseline_star_border_black_24))
        couponSaveView.drawable.setTint(Color.DKGRAY)
      }
      couponSaveView.setOnClickListener {
        if (Client.isSavedCoupon(coupon.id)) {
          Client.removeSavedCoupon(coupon.id)
          couponSaveView.setImageDrawable(it.context.getDrawable(R.drawable.baseline_star_border_black_24))
          couponSaveView.drawable.setTint(Color.DKGRAY)
        } else {
          Client.addSavedCoupon(coupon)
          couponSaveView.setImageDrawable(it.context.getDrawable(R.drawable.baseline_star_black_24))
          couponSaveView.drawable.setTint(savedCouponTintColor)
        }
      }
    }
  }


  interface OnItemClickListener {
    fun onItemClick(coupon: Coupon)
  }

  // Create new views (invoked by the layout manager)
  override fun onCreateViewHolder(
    parent: ViewGroup,
    viewType: Int
  ): RecyclerView.ViewHolder {
    if (viewType == ITEM_TYPE_CONTENT) {
      val couponView = LayoutInflater.from(parent.context)
        .inflate(R.layout.coupon_list_item, parent, false) as androidx.cardview.widget.CardView
      return CouponViewHolder(couponView)
    } else {
      val headerView =
        LayoutInflater.from(parent.context).inflate(R.layout.coupon_list_header, parent, false) as TextView
      headerView.text = header
      return HeaderViewHolder(headerView)
    }
  }

  override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
    if (position >= 0) {
      val coupon = coupons[position]
      val couponViewHolder = holder as CouponViewHolder
      couponViewHolder.bind(coupon, headerDisplayMode, clickListener)
    } else {
      (holder as HeaderViewHolder).headerView.text = header
    }
  }

  override fun getItemCount() = coupons.size

  override fun getItemViewType(position: Int): Int {
    if (position < 0) {
      return ITEM_TYPE_HEADER
    }
    return ITEM_TYPE_CONTENT
  }
}