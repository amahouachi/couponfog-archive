package com.couponfog.view.util

import android.content.Intent
import android.os.Bundle
import android.view.MenuItem
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.preference.Preference
import androidx.preference.PreferenceFragmentCompat
import com.couponfog.R
import com.couponfog.app.AppRater
import com.couponfog.app.Configuration
import com.couponfog.app.ShareUtils


class SettingsActivity : AppCompatActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.settings_activity)
    supportFragmentManager
      .beginTransaction()
      .replace(R.id.settings, SettingsFragment())
      .commit()
    val toolbar = findViewById<Toolbar>(R.id.toolbar)
    setSupportActionBar(toolbar)
    supportActionBar?.setDisplayHomeAsUpEnabled(true)
    supportActionBar?.title= "Settings"
  }
  override fun onOptionsItemSelected(item: MenuItem): Boolean {
    when (item.itemId) {
      android.R.id.home -> {
        super.onBackPressed()
      }
    }
    return super.onOptionsItemSelected(item)
  }

  class SettingsFragment : PreferenceFragmentCompat() {
    override fun onCreatePreferences(savedInstanceState: Bundle?, rootKey: String?) {
      setPreferencesFromResource(R.xml.root_preferences, rootKey)
    }

    override fun onPreferenceTreeClick(preference: Preference?): Boolean {
      context?.let {
        when(preference?.key){
          SETTING_SEND_FEEDBACK -> {
            ShareUtils.sendFeedback(it)
          }
          SETTING_RATE_APP -> {
            AppRater.rate(it)
          }
          SETTING_SHARE_APP -> {
            ShareUtils.shareApp(it)
          }
          SETTING_MANAGE_NOTIFICATIONS -> {
            val intent = Intent()
            intent.action = "android.settings.APP_NOTIFICATION_SETTINGS"
            intent.putExtra("app_package", it.packageName)
            intent.putExtra("app_uid", it.applicationInfo.uid)
            intent.putExtra("android.provider.extra.APP_PACKAGE", it.packageName)
            startActivity(intent)
          }
          SETTING_PRIVACY_POLICY, SETTING_DISCLOSURE, SETTING_TERMS -> {
            val intent= Intent(context, HtmlViewerActivity::class.java)
            var title=""
            var urlKey=""
            when (preference.key){
              SETTING_TERMS -> {
                title= "Terms of Use"
                urlKey= "terms_url"
              }
              SETTING_PRIVACY_POLICY -> {
                title= "Privacy Policy"
                urlKey= "privacy_url"
              }
              SETTING_DISCLOSURE -> {
                title= "Affiliate Disclosure"
                urlKey= "disclosure_url"
              }
            }
            intent.putExtra(HtmlViewerActivity.KEY_TITLE, title)
            var url= Configuration.getProperty(urlKey)
            if(url!!.startsWith('/')){
              url= Configuration.getProperty("web_url")+url
            }
            intent.putExtra(HtmlViewerActivity.KEY_URL, url)
            startActivity(intent)
          }
        }

      }
      return super.onPreferenceTreeClick(preference)
    }

  }

  companion object{
    const val SETTING_SEND_FEEDBACK= "send-feedback"
    const val SETTING_RATE_APP= "rate-app"
    const val SETTING_SHARE_APP= "share-app"
    const val SETTING_MANAGE_NOTIFICATIONS= "manage-notifications"
    const val SETTING_PRIVACY_POLICY= "privacy-policy"
    const val SETTING_TERMS= "terms"
    const val SETTING_DISCLOSURE= "affiliate-disclosure"
  }
}