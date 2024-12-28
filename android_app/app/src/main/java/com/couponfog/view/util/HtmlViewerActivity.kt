package com.couponfog.view.util

import android.os.Bundle
import android.view.MenuItem
import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import com.couponfog.R


class HtmlViewerActivity : AppCompatActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_local_html_viewer)
    val title= intent.extras?.get(KEY_TITLE) as String
    val url= intent.extras?.get(KEY_URL) as String
    val toolbar = findViewById<Toolbar>(R.id.toolbar)
    setSupportActionBar(toolbar)
    supportActionBar?.setDisplayHomeAsUpEnabled(true)
    supportActionBar?.title= title
    val mWebView = findViewById<WebView>(R.id.webView)
    mWebView.loadUrl(url)
  }

  override fun onOptionsItemSelected(item: MenuItem): Boolean {
    when (item.itemId) {
      android.R.id.home -> {
        super.onBackPressed()
      }
    }
    return super.onOptionsItemSelected(item)
  }

  companion object{
    const val KEY_TITLE= "title"
    const val KEY_URL= "url"
  }
}
