package com.couponfog.cache

import java.io.Serializable

class CacheEntry constructor(var timestamp: Long, var data: Any?) : Serializable {
  fun isExpired(): Boolean{
    val now= System.currentTimeMillis()
    return timestamp < now
  }
  companion object{
    /**
     * @param ttl: time to live in minutes
     * @param data: data to cache, any type
     */
    fun build(ttl: Int, data: Any): CacheEntry {
      val t= (ttl.toLong() * 60L * 1000L)+System.currentTimeMillis()
      return CacheEntry(t, data)
    }
  }
}