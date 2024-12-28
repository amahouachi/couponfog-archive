package com.couponfog.model

import org.json.JSONObject
import java.io.Serializable
import java.text.SimpleDateFormat

class Coupon constructor(
  val id: String,
  val name: String,
  val type: String,
  val code: String,
  val endDate: Int,
  var storeId: String,
  var storeName: String,
  val discount: Discount,
  val details: String?
) : Serializable {

  companion object {
    private const val serialVersionUID = 20180617104401L
    private const val DISCOUNT_PERCENT_OFF = "percentOff"
    private const val DISCOUNT_DOLLAR_OFF = "dollarOff"
    private const val DISCOUNT_FREE_SHIPPING = "freeShipping"
    private const val DISCOUNT_FREE_GIFT = "freeGift"
    private const val DISCOUNT_BOGO = "bogo"
    private const val EXPIRE_SOON_INTERVAL= 1000 * 3600 * 24
    private val dateFormatMD = SimpleDateFormat("M/d")
    private val dateFormatMDY = SimpleDateFormat("MM/dd/yyyy")

    fun fromJson(couponJson: JSONObject): Coupon {
      val id = couponJson.getString("id")
      val name = couponJson.getString("name")
      val type = couponJson.getString("type")
      val code = couponJson.getString("code")
      val storeId = couponJson.optString("storeId")
      val storeName = couponJson.optString("storeName")
      val details = couponJson.optString("details")
      val endDate = couponJson.getInt("endDate")
      val discountJson = couponJson.getJSONObject("discount")
      val discount = Discount(discountJson.getString("type"), discountJson.getString("value"))
      return Coupon(id, name, type, code, endDate, storeId, storeName, discount, details)
    }
  }

  fun getDiscountString(): String {
    if (discount == null) {
      return "Code"
    }
    when (discount.type) {
      DISCOUNT_PERCENT_OFF,
      DISCOUNT_DOLLAR_OFF -> {
        return discount.value + " OFF"
      }
      DISCOUNT_FREE_SHIPPING -> {
        return "Free Shipping"
      }
      DISCOUNT_FREE_GIFT -> {
        return "Free Gift"
      }
      DISCOUNT_BOGO -> {
        return "BOGO"
      }
      else -> {
        return "Code"
      }
    }
  }

  fun getExpirationLabel(): String {
    val endDateMs:Long= endDate.toLong() * 1000L
    if (endDate == 0) {
      return ""
    }
    val nowMs = System.currentTimeMillis()
    if (endDateMs > nowMs + EXPIRE_SOON_INTERVAL) {
      return ""
    }
    if (endDateMs > nowMs - EXPIRE_SOON_INTERVAL) {
      return "Expires soon"
    }else{
      return "Expired"
    }
  }
  fun hasDetails(): Boolean{
    return details!=null && details!=""
  }
  class Discount constructor(val type: String, val value: String) : Serializable
}

