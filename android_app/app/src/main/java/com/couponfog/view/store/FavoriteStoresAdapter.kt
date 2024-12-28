package com.couponfog.view.store

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.recyclerview.widget.RecyclerView
import com.couponfog.R
import com.couponfog.model.Client
import com.couponfog.model.Store
import kotlinx.android.synthetic.main.coupon_list_item.view.storeName
import kotlinx.android.synthetic.main.fav_store_list_item.view.*

class FavoriteStoresAdapter(var stores: List<Store>, val storeClickListener: OnItemClickListener) :
  RecyclerView.Adapter<RecyclerView.ViewHolder>() {

  companion object {
    const val ITEM_TYPE_HEADER = 0
    const val ITEM_TYPE_CONTENT = 1
  }

  class HeaderViewHolder(val headerView: TextView) : RecyclerView.ViewHolder(headerView)
  class StoreViewHolder(var storeView: androidx.cardview.widget.CardView) :
    RecyclerView.ViewHolder(storeView) {

    fun bind(store: Store) {
      storeView.storeName.text = store.name
    }
  }


  interface OnItemClickListener {
    fun onItemClick(store: Store)
  }

  // Create new views (invoked by the layout manager)
  override fun onCreateViewHolder(
    parent: ViewGroup,
    viewType: Int
  ): RecyclerView.ViewHolder {
    if (viewType == ITEM_TYPE_CONTENT) {
      val couponView = LayoutInflater.from(parent.context)
        .inflate(R.layout.fav_store_list_item, parent, false) as androidx.cardview.widget.CardView
      return StoreViewHolder(couponView)
    } else {
      val headerView =
        LayoutInflater.from(parent.context).inflate(R.layout.fav_store_list_header, parent, false) as TextView
      return HeaderViewHolder(headerView)
    }
  }

  override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
    if (position > 0) {
      val store = stores[position - 1]
      val storeViewHolder = holder as StoreViewHolder
      storeViewHolder.bind(store)
      storeViewHolder.storeView.setOnClickListener({ v -> storeClickListener.onItemClick(store) })
      if (Client.isFavoriteStore(store.id)) {
        (storeViewHolder.storeView.unfaveStore as ImageView).setImageDrawable(
          storeViewHolder.storeView.context.getDrawable(
            R.drawable.baseline_favorite_24
          )
        )
        (storeViewHolder.storeView.unfaveStore as ImageView).drawable.setTint(
          storeViewHolder.storeView.context.resources.getColor(
            android.R.color.holo_red_light
          )
        )
      } else {
        (storeViewHolder.storeView.unfaveStore as ImageView).setImageDrawable(
          storeViewHolder.storeView.context.getDrawable(
            R.drawable.baseline_favorite_border_24
          )
        )
        (storeViewHolder.storeView.unfaveStore as ImageView).drawable.setTint(
          storeViewHolder.storeView.context.resources.getColor(
            R.color.dark_gray
          )
        )
      }
      storeViewHolder.storeView.unfaveStore.setOnClickListener { v ->
        if (Client.isFavoriteStore(store.id)) {
          Client.removeFavoriteStore(store)
          (v as ImageView).setImageDrawable(v.context.getDrawable(R.drawable.baseline_favorite_border_24))
          (v as ImageView).drawable.setTint(v.resources.getColor(R.color.dark_gray))
          Toast.makeText(v.context, "Removed from your favorites", Toast.LENGTH_SHORT).show()
        } else {
          Client.addFavoriteStore(store)
          (v as ImageView).setImageDrawable(v.context.getDrawable(R.drawable.baseline_favorite_24))
          (v as ImageView).drawable.setTint(v.resources.getColor(android.R.color.holo_red_light))
        }
      }
    }
  }

  override fun getItemCount() = stores.size + 1

  override fun getItemViewType(position: Int): Int {
    if (position == 0) {
      return ITEM_TYPE_HEADER
    }
    return ITEM_TYPE_CONTENT
  }
}