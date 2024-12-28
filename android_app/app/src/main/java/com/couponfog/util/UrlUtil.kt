package com.couponfog.util

import android.net.Uri
import com.couponfog.app.Configuration
import com.couponfog.model.Client

class UrlUtil {
  companion object{
    fun getOutUrl(storeId: String, couponId: String?= null): String{
      var url= "${Configuration.getProperty("out_url")}/out?c=${Client.getId()}&s=${storeId}"
      if(couponId!=null){
        url+= "&cp=${couponId}"
      }
      return url
    }
  }
}