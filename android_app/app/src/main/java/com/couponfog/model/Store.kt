package com.couponfog.model

import org.json.JSONObject
import java.io.Serializable

class Store constructor(val id: String,val name: String,val slug: String, var coupons: ArrayList<Coupon>, var popularity: Int=0) : Serializable {

  companion object {
    private const val serialVersionUID = 20180617104400L

    fun fromJson(storeJson: JSONObject): Store {
      val id= storeJson.getString("id")
      val name= storeJson.getString("name")
      val slug= storeJson.getString("slug")
      val popularity= storeJson.optInt("popularity", 0)
      val coupons= ArrayList<Coupon>()
      val couponsJson = storeJson.optJSONArray("coupons")
      if(couponsJson!=null){
        for (i in 0 until couponsJson.length()) {
          coupons.add(Coupon.fromJson(couponsJson.getJSONObject(i)))
        }
      }
      return Store(id,name,slug,coupons, popularity)
    }
  }
}