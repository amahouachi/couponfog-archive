const config= {
  webUrl: process.env.CF_WEB_URL,
  environment: process.env.CF_ENV,
  debug: parseInt(process.env.CF_DEBUG),
  readApiPort: parseInt(process.env.CF_RAPI_PORT),
  writeApiPort: parseInt(process.env.CF_WAPI_PORT),
  adminApiPort: parseInt(process.env.CF_AAPI_PORT),
  logDir: process.env.CF_LOG_DIR,
  accessLogEnabled: process.env.CF_ACCESS_LOG_ENABLED,
  proxyCrawlToken: process.env.CF_PROXY_CRAWL_TOKEN,
  aws: {
    region: process.env.AWS_REGION,
    topics: {
      backend: process.env.CF_AWS_SNS_TOPIC_BACKEND,
      rapi: process.env.CF_AWS_SNS_TOPIC_RAPI,
      wapi: process.env.CF_AWS_SNS_TOPIC_WAPI
    }
  },
  db: {
    host: process.env.CF_DB_HOST,
    port: parseInt(process.env.CF_DB_PORT),
    user: process.env.CF_DB_USER,
    password: process.env.CF_DB_PASSWORD,
    database: process.env.CF_DB_NAME,
    waitForConnections: true,
    connectionLimit: parseInt(process.env.CF_DB_POOL_SIZE),
    queueLimit: 0,
  },
  cache: {
    host: process.env.CF_REDIS_HOST,
    port: parseInt(process.env.CF_REDIS_PORT),
    readTimeout: parseInt(process.env.CF_REDIS_READ_TIMEOUT),
    connectTimeout: parseInt(process.env.CF_REDIS_CONNECT_TIMEOUT),
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
    retryStrategy: function (times) {
      return 20000;
    },
  },
  firebase: {
    account: {
      "type": "service_account",
      "project_id": "couponfog",
      "private_key_id": "******************",
      "private_key": "**************************",
      "client_email": "*********************",
      "client_id": "***************************",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "**************************************"
    },
    maxPayloadLength: 3000
  },
  affiliate: {
    defaultMonetizer: "skimlinks",
    viglink: {
      url: "http://redirect.viglink.com/",
      apiKey: process.env.CF_AFFILIATE_VIGLINK_API_KEY,
      secretKey: ""
    },
    skimlinks: {
      url: "https://go.skimresources.com/",
      siteId: process.env.CF_AFFILIATE_SKIMLINKS_SITE_ID,
      clientId: process.env.CF_AFFILIATE_SKIMLINKS_CLIENT_ID,
      clientSecret: process.env.CF_AFFILIATE_SKIMLINKS_CLIENT_SECRET
    },
    cj: {
      websiteId: process.env.CF_AFFILIATE_CJ_WEBSITE_ID,
      tracker: 'https://www.anrdoezrs.net/links/$websiteId/type/dlg/sid/$sid/$url',
    },
    ls: {
      publisherId: process.env.CF_AFFILIATE_LS_PUBLISHER_ID,
      tracker: 'https://click.linksynergy.com/deeplink?id=$publisherId&mid=$merchantId&u1=$subid&murl=$url',
    },
  },
  providers: [
    {name: "honey", status: 1},
    {name: "rmn", status: 1},
    {name: "cently", status: 1},
    {name: "sherpa", status: 1},
  ],
  backend: {
    cleanupInterval: parseInt(process.env.CF_BACKEND_CLEANUP_INTERVAL),
    cacheMonitorInterval: parseInt(process.env.CF_BACKEND_CACHE_MONITOR_INTERVAL),
    importRunIntervalMin: parseInt(process.env.CF_BACKEND_IMPORT_RUN_INTERVAL_MIN),
    importRunIntervalMax: parseInt(process.env.CF_BACKEND_IMPORT_RUN_INTERVAL_MAX),
    importWaitBetweenProviders: parseInt(process.env.CF_BACKEND_IMPORT_WAIT_BETWEEN_PROVIDERS),
    importWaitBetweenStoresMin: parseInt(process.env.CF_BACKEND_IMPORT_WAIT_BETWEEN_STORES_MIN),
    importWaitBetweenStoresMax: parseInt(process.env.CF_BACKEND_IMPORT_WAIT_BETWEEN_STORES_MAX),
    processPushSubscriptionsTick: parseInt(process.env.CF_BACKEND_PROCESS_PUSH_SUBSCRIPTIONS_TICK),
    processPushSubscriptionsInterval: parseInt(process.env.CF_BACKEND_PROCESS_PUSH_SUBSCRIPTIONS_INTERVAL),
    logImportProgressEveryStoreCount: parseInt(process.env.CF_BACKEND_LOG_IMPORT_PROGRESS_EVERY_STORE_COUNT)
  },
  nanoid: {
    alphabet: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    //do not change idLength unless you adapt db columns e.g clients.id
    idLength: 20
  }
};

exports.config= config;
