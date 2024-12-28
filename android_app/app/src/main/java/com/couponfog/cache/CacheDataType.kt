package com.couponfog.cache

import com.google.gson.JsonDeserializer

interface CacheDataType{
  fun getNamespace(): String
  fun getDeserializer(): JsonDeserializer<CacheEntry>?
}