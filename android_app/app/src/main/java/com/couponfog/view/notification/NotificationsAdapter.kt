package com.couponfog.view.notification

import android.graphics.Typeface
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.amulyakhare.textdrawable.TextDrawable
import com.amulyakhare.textdrawable.util.ColorGenerator
import com.couponfog.R
import com.couponfog.model.Notification
import com.couponfog.service.DB
import com.google.android.material.snackbar.BaseTransientBottomBar
import com.google.android.material.snackbar.Snackbar
import kotlinx.android.synthetic.main.notification_list_item.view.*

class NotificationsAdapter( var notifications: ArrayList<Notification>, val clickListener: OnItemClickListener? ) :
  RecyclerView.Adapter<RecyclerView.ViewHolder>() {

  class NotificationViewHolder(var view: androidx.cardview.widget.CardView) :
    RecyclerView.ViewHolder(view) {

    fun bind(notification: Notification, clickListener: OnItemClickListener?) {
      var badge= ""
      if(notification.type==Notification.TYPE_COUPON_ALERT_FULL || notification.type==Notification.TYPE_COUPON_ALERT_SUMMARY){
        badge= notification.store!!.name
      }else{
        badge= "Notification"
      }
      val generator = ColorGenerator.MATERIAL
      val logoColor = generator.getColor(badge)
      val drawable = TextDrawable.builder().buildRound("${badge.first()}", logoColor)
      view.storeLogo.setImageDrawable(drawable)
      view.notificationTitle.text = notification.title
      view.notificationBody.text = notification.body
      view.timestamp.text= notification.getDisplayDate()
      if(notification.unread){
        view.notificationTitle.setTypeface(view.notificationTitle.typeface, Typeface.BOLD)
        view.notificationBody.setTypeface(view.notificationBody.typeface, Typeface.BOLD)
        view.timestamp.setTypeface(view.timestamp.typeface, Typeface.BOLD)
      }else{
        view.notificationTitle.setTypeface(view.notificationTitle.typeface, Typeface.NORMAL)
        view.notificationBody.setTypeface(view.notificationBody.typeface, Typeface.NORMAL)
        view.timestamp.setTypeface(view.timestamp.typeface, Typeface.NORMAL)
      }
      if(clickListener!=null){
        view.setOnClickListener { clickListener.onItemClick(notification, adapterPosition) }
      }
    }
  }


  interface OnItemClickListener {
    fun onItemClick(notification: Notification, position: Int)
  }

  // Create new views (invoked by the layout manager)
  override fun onCreateViewHolder(
    parent: ViewGroup,
    viewType: Int
  ): RecyclerView.ViewHolder {
    val view = LayoutInflater.from(parent.context)
      .inflate(R.layout.notification_list_item, parent, false) as androidx.cardview.widget.CardView
    return NotificationViewHolder(view)
  }

  override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
    val notification = notifications[position]
    val viewHolder = holder as NotificationViewHolder
    viewHolder.bind(notification, clickListener)
  }

  override fun getItemCount() = notifications.size
  fun removeNotification(position: Int, viewHolder: RecyclerView.ViewHolder) {
    val removedNotification= notifications[position]
    notifications.removeAt(position)
    notifyItemRemoved(position)

    Snackbar.make(viewHolder.itemView, "Notification removed", Snackbar.LENGTH_LONG).setAction("UNDO") {
      notifications.add(position, removedNotification)
      notifyItemInserted(position)
    }.addCallback(object: BaseTransientBottomBar.BaseCallback<Snackbar>(){
      override fun onDismissed(transientBottomBar: Snackbar?, event: Int) {
        super.onDismissed(transientBottomBar, event)
        if(event!=Snackbar.Callback.DISMISS_EVENT_ACTION){
          DB.removeNotification("${removedNotification.id}")
        }
      }
    })
      .show()
  }

}
