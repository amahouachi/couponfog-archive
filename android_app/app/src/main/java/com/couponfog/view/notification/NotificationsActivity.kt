package com.couponfog.view.notification

import android.content.Intent
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.graphics.drawable.Drawable
import android.os.Bundle
import android.view.MenuItem
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.ItemTouchHelper
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.couponfog.R
import com.couponfog.model.Notification
import com.couponfog.service.DB
import com.couponfog.view.coupon.CouponActivity
import com.couponfog.view.store.StoreActivity
import kotlinx.android.synthetic.main.activity_notifications.*


class NotificationsActivity : AppCompatActivity(){

  private var notificationsAdapter: NotificationsAdapter? = null
  private var notificationsRecyclerView: RecyclerView? = null
  private var notificationClickListener: NotificationsAdapter.OnItemClickListener?= null
  private lateinit var colorDrawableBackground: ColorDrawable
  private lateinit var deleteIcon: Drawable
  private lateinit var swipeToDeleteCallback: ItemTouchHelper.SimpleCallback

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_notifications)
    val toolbar = findViewById<Toolbar>(R.id.toolbar)
    setSupportActionBar(toolbar)
    supportActionBar?.setDisplayHomeAsUpEnabled(true)
    supportActionBar?.title = "Notifications"
    colorDrawableBackground = ColorDrawable(Color.parseColor("#d32f2f"))
    deleteIcon = ContextCompat.getDrawable(this, R.drawable.baseline_delete_white_36)!!
    notificationsRecyclerView = notification_list
    notificationClickListener= object : NotificationsAdapter.OnItemClickListener {
      override fun onItemClick(notification: Notification, position: Int) {
        if(notification.unread){
          notification.markAsRead()
          notificationsAdapter?.notifyDataSetChanged()
        }
        if(notification.type==Notification.TYPE_COUPON_ALERT_FULL){
          if(notification.coupons?.size==1){
            val i = Intent(this@NotificationsActivity, CouponActivity::class.java)
            i.putExtra(CouponActivity.EXTRA_COUPON, notification.coupons!![0])
            startActivity(i)
          }else{
            val i = Intent(this@NotificationsActivity, CouponNotificationActivity::class.java)
            i.putExtra(CouponNotificationActivity.EXTRA_NOTIFICATION, notification)
            startActivity(i)
          }
        }else if(notification.type==Notification.TYPE_COUPON_ALERT_SUMMARY){
          val i = Intent(this@NotificationsActivity, StoreActivity::class.java)
          i.putExtra(StoreActivity.EXTRA_STORE, notification.store)
          startActivity(i)
        }
      }
    }
    swipeToDeleteCallback = object : ItemTouchHelper.SimpleCallback(0, ItemTouchHelper.LEFT or ItemTouchHelper.RIGHT) {
      override fun onMove(recyclerView: RecyclerView, viewHolder: RecyclerView.ViewHolder, viewHolder2: RecyclerView.ViewHolder): Boolean {
        return false
      }

      override fun onSwiped(viewHolder: RecyclerView.ViewHolder, swipeDirection: Int) {
        notificationsAdapter?.removeNotification(viewHolder.adapterPosition, viewHolder)
      }

      override fun onChildDraw(
        c: Canvas,
        recyclerView: RecyclerView,
        viewHolder: RecyclerView.ViewHolder,
        dX: Float,
        dY: Float,
        actionState: Int,
        isCurrentlyActive: Boolean
      ) {
        val itemView = viewHolder.itemView
        val iconMarginVertical = (viewHolder.itemView.height - deleteIcon.intrinsicHeight) / 2

        if (dX > 0) {
          colorDrawableBackground.setBounds(itemView.left, itemView.top, dX.toInt(), itemView.bottom)
          deleteIcon.setBounds(itemView.left + iconMarginVertical, itemView.top + iconMarginVertical,
            itemView.left + iconMarginVertical + deleteIcon.intrinsicWidth, itemView.bottom - iconMarginVertical)
        } else {
          colorDrawableBackground.setBounds(itemView.right + dX.toInt(), itemView.top, itemView.right, itemView.bottom)
          deleteIcon.setBounds(itemView.right - iconMarginVertical - deleteIcon.intrinsicWidth, itemView.top + iconMarginVertical,
            itemView.right - iconMarginVertical, itemView.bottom - iconMarginVertical)
          deleteIcon.level = 0
        }

        colorDrawableBackground.draw(c)

        c.save()

        if (dX > 0)
          c.clipRect(itemView.left, itemView.top, dX.toInt(), itemView.bottom)
        else
          c.clipRect(itemView.right + dX.toInt(), itemView.top, itemView.right, itemView.bottom)

        deleteIcon.draw(c)

        c.restore()

        super.onChildDraw(c, recyclerView, viewHolder, dX, dY, actionState, isCurrentlyActive)
      }
    }
    setupNotificationsAdapter()
  }

  override fun onStart() {
    super.onStart()
    DB.clearNewNotifications()
  }

  private fun setupNotificationsAdapter() {
    if (notificationsAdapter == null) {
      notificationsAdapter = NotificationsAdapter( DB.getNotifications(),notificationClickListener)
      notificationsRecyclerView?.apply {
        setHasFixedSize(true)
        setItemViewCacheSize(50)
        layoutManager = LinearLayoutManager(this@NotificationsActivity)
        adapter = notificationsAdapter
        //addItemDecoration(DividerItemDecoration(context, (layoutManager!! as LinearLayoutManager).orientation))
        ItemTouchHelper(swipeToDeleteCallback).attachToRecyclerView(this)
      }
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
    notificationsRecyclerView?.apply {
      val start = (layoutManager as LinearLayoutManager).findFirstVisibleItemPosition()
      val end = (layoutManager as LinearLayoutManager).findLastVisibleItemPosition()
      adapter?.notifyItemRangeChanged(start, end - start + 1)
    }
  }
}