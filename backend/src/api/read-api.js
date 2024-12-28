const db= require('../common/db');
const {Util}= require('../common/util');
const {config}= require('../common/config');
const cache= require('../common/cache');
const path = require('path');
const morgan = require('morgan');
const {logger, createAccessLogStream, getAccessLogFormat}= require('../common/logger');
const repository= require('../common/repository');
const readApi= require('../common/app').app;

const morganOptions= {
  skip: function (req, res) {
    return req.method==='HEAD';
  }
};
if(config.environment==='dev'){
  readApi.use(morgan('dev', morganOptions));
}else if(config.accessLogEnabled){
  readApi.use(morgan(getAccessLogFormat(), Object.assign({ stream: createAccessLogStream({filename: "read-access.log"})}, morganOptions)));
}

readApi.get('/', function (req, res) {
  res.send('RUNNING');
});
readApi.get('/api/coupons', async (req, res) => {
  try{
    const coupons= await db.stores.getLatestCoupons();
    res.header('Content-Type', 'application/json');
    res.json(coupons);
  }catch (e) {
    res.status(500).send('Internal Server Error');
    logger.error(`[getLatestCoupons] ${e.toString()}`);
  }
});
readApi.get('/api/stores/:slug', async (req, res) => {
  try{
    const store= await repository.getStoreBySlug(req.params.slug, req.query['target']);
    if(store==null){
      res.status(404).send('Not found');
      return;
    }
    res.header('Content-Type', 'application/json');
    res.json(store);
  }catch (e) {
    res.status(500).send('Internal Server Error');
    logger.error(`[/api/stores/${req.params.slug}] ${e.toString()}`);
  }
});
readApi.get('/api/clients/:id/coupons', async (req, res) => {
  const clientId= req.params.id;
  if(Util.isClientIdValid(clientId)){
    try{
      res.json(await db.clients.getFavedCoupons(clientId));
    }catch (e) {
      res.status(500).send('Internal Server Error');
      logger.error(`[getFavedCoupons] ${e.toString()}`);
    }
  }else{
    res.redirect('/');
  }
});
readApi.get('/go', async (req, res) => {
  let url= config.webUrl;
  if('s' in req.query && Util.isInteger(req.query.s)){
    const storeId= req.query.s;
    try{
      const store= await repository.getStoreById(storeId);
      if(store){
        url+= `/coupons/${store.slug}`;
        if('c' in req.query && Util.isInteger(req.query.c)){
          url+= `#c${req.query.c}`;
        }
      }
    }catch (e) {
      logger.error(e);
    }
  }
  res.redirect(url);
});
readApi.get('/sitemap.xml', async (req, res) => {
  let xml= "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xhtml=\"http://www.w3.org/1999/xhtml\">\n";
  const sql= "select slug from stores where status=1 order by popularity desc";
  let stores= await db.query(sql);
  for(const s of stores){
    xml+= `<url>\n<loc>${config.webUrl}/coupons/${s.slug}</loc></url>\n`;
  }
  xml+= '</urlset>';
  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

readApi.get('/api/stores', async (req, res) => {
  const target= req.query['target'];
  let sql= "select id,slug,name,popularity from stores where status=1";
  if(target && target==='extension'){
    sql= "select id,slug,urlPatterns from stores where status=1";
    const rows= await db.query(sql);
    const results= rows.map(({id,slug,urlPatterns}) => {
      return {id, slug, urlPatterns: JSON.parse(urlPatterns)}
    });
    res.json(results);
  }else{
    res.json(await db.query(sql));
  }
});
readApi.get('/api/topstores', async (req, res) => {
  const sql= "select id,slug,name from stores where status=1 order by popularity desc limit 0,50";
  res.json(await db.query(sql));
});
readApi.listen(config.readApiPort,
    async () => {
      config.currentApp= "rapi";
      await db.connect(config.db);
      await cache.initialize(config.cache);
      logger.info(`Listening on port ${config.readApiPort}!`);
    });