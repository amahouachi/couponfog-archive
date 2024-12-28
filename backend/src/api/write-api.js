const db= require('../common/db');
const {Util}= require('../common/util');
const {config}= require('../common/config');
const cache= require('../common/cache');
const morgan = require('morgan');
const {logger, createAccessLogStream, getAccessLogFormat}= require('../common/logger');
const repository= require('../common/repository');
const writeApi= require('../common/app').app;

if(config.environment==='dev'){
  writeApi.use(morgan('dev'));
}else if(config.accessLogEnabled){
  writeApi.use(morgan(getAccessLogFormat(), { stream: createAccessLogStream({filename: "write-access.log"}) }));
}

writeApi.get('/', function (req, res) {
  res.send('RUNNING');
});
writeApi.post('/api/clients', async (req, res) => {
  const client= req.body;
  if(Util.isClientIdValid(client.id)){
    try{
      await db.clients.create(client);
      res.json(client);
    }catch (e) {
      res.status(500).send('Internal Server Error');
      logger.error(`[${req.url}] ${e.toString()}`);
    }
  }else{
    res.status(400).send('Bad Request');
    logger.error(`[${req.url}] Invalid id : ${client.id}`);
  }
});
writeApi.post('/api/clients/:id/heartbeat', async (req, res) => {
  const clientId= req.params.id;
  if(Util.isClientIdValid(clientId)){
    try{
      let client = await db.clients.findById(clientId);
      if(!client){
        logger.error(`[${req.url}] Client not found. Creating a new client.`);
        client= {id: clientId};
        await db.clients.create(client);
      }else{
        const now= Util.getTimestamp();
        await db.write(`update clients set lastHeartbeat='${now}' where id='${clientId}'`);
      }
      res.json({status: "OK"});
    }catch (e) {
      res.status(500).send('Internal Server Error');
      logger.error(`[${req.url}] ${e.toString()}`);
    }
  }else{
    res.status(400).send('Bad Request');
    logger.error(`[${req.url}] Invalid id : ${client.id}`);
  }
});
/*
Enabled + token => replace existing token and subscribe to topics
Enabled + no token => subscribe to topics with existing token if any
Disabled + token => a weird situation, do nothing
Disabled + no token => unsubscribe from topics with existing token if any
Undefined + token => just store the token
Undefined + no token => do nothing
 */
writeApi.post('/api/clients/:id/notification', async (req, res) => {
  const clientId= req.params.id;
  const notification= req.body;
  let enabled=undefined, token=undefined;
  if('enabled' in notification){
    enabled= notification.enabled;
    if(enabled!==1 && enabled!==0){
      enabled= undefined;
    }
  }
  if('token' in notification){
    token= notification.token;
  }
  if(!Util.isClientIdValid(clientId) || (token===undefined && enabled===undefined)){
    res.status(400).send('Bad Request');
    logger.error(`[${req.url}] Invalid id or empty inputs`);
    return;
  }
  try{
    let client = await db.clients.findById(clientId);
    if(!client){
      logger.error(`[${req.url}] Client not found. Creating a new client.`);
      client= {id: clientId};
      await db.clients.create(client);
    }
    await db.clients.updateNotificationSettings(client.id, token, enabled);
    if(token===undefined){
      token= client.notificationToken;
    }
    const favedStoreIds= await db.clients.getFavedStoreIds(client.id);
    if(token && favedStoreIds.length>0){
      if(enabled===1){
        await db.clients.subscribeToStores(client.id, favedStoreIds);
      }else if(enabled===0){
        await db.clients.unsubscribeFromStores(client.id, favedStoreIds);
      }
    }
  }catch (e) {
    res.status(500).send('Internal Server Error');
    logger.error(`[${req.url}] ${e.toString()}`);
    return;
  }
  res.json({status: "OK"});
});
writeApi.post('/api/clients/:id/stores', async (req, res) => {
  let storeIds= req.body;
  const clientId= req.params.id;
  if(!Util.isClientIdValid(clientId)){
    res.status(400).send('Bad Request');
    logger.error(`[${req.url}] Bad client id`);
    return;
  }
  let client = await db.clients.findById(clientId);
  if(!client){
    logger.error(`[${req.url}] Client not found. Creating a new client.`);
    client= {id: clientId};
    await db.clients.create(client);
  }
  if(!Util.isInteger(storeIds)){
    res.status(400).send('Bad Request');
    logger.error(`[${req.url}] storeIds are not valid integers`);
    return;
  }
  try{
    const oldStoreIds= await db.clients.getFavedStoreIds(client.id);
    const storesToRemove= [];
    const storesToAdd= [];
    for(const oldStoreId of oldStoreIds){
      if(!storeIds.includes(oldStoreId)){
        storesToRemove.push(oldStoreId);
      }
    }
    for(const newStoreId of storeIds){
      if(!oldStoreIds.includes(newStoreId)){
        storesToAdd.push(newStoreId);
      }
    }
    if(storesToRemove.length>0){
      await db.clients.removeFavedStores(client.id, storesToRemove);
      if(client.notificationToken) {
        await db.clients.unsubscribeFromStores(client.id, storesToRemove);
      }
    }
    if(storesToAdd.length>0){
      await db.clients.addFavedStores(client.id, storesToAdd);
      if(client.notificationToken){
        await db.clients.subscribeToStores(client.id, storesToAdd);
      }
    }
  }catch (e) {
    res.status(500).send('Internal Server Error');
    logger.error(`[${req.url}] ${e.toString()}`);
    return;
  }
  res.json([]);
});
writeApi.post('/api/clients/:id/savings', async (req, res) => {
  let savingBody= req.body;
  const saving= {};
  let clientId= req.params.id;
  if(!Util.isClientIdValid(clientId)){
    clientId= Util.getUnknownClientId();
  }else{
    let client= await db.clients.findById(clientId);
    if(client==null){
      await db.clients.create({id: clientId, type: "extension"});
    }
  }
  const fields= ['storeId', 'couponId', 'total', 'discount'];
  for(const field of fields){
    if(savingBody[field]==null){
      res.json({});
      return;
    }
    saving[field]= savingBody[field];
  }
  saving.clientId= clientId;
  saving.orderDate= Util.getTimestamp();
  db.clients.createSaving(saving);
  cache.setStoreById(saving.storeId);
  res.json({});
});
writeApi.get('/out', async (req, res) => {
  let clientId= req.query['c'];
  if(!Util.isClientIdValid(clientId)){
    clientId= Util.getUnknownClientId();
  }
  const storeId= req.query['s'];
  if(!Util.isInteger([storeId])){
    res.redirect(config.webUrl);
    return;
  }
  const couponId= req.query['cp'];
  let trip;
  try{
    const store = await repository.getStoreById(storeId);
    if(!store){
      res.redirect(config.webUrl);
      return;
    }
    trip= { id: Util.uuid(), clientId, storeId, tripDate: Util.getTimestamp() };
    const affUrl= Util.getAffiliateUrl(trip, store, couponId);
    res.redirect(affUrl);
    logger.debug(affUrl);
  }catch (e) {
    res.redirect(config.webUrl);
    logger.error(`[${req.url}] ${e.toString()}`);
    return;
  }
  db.shoptrips.create(trip);
});

writeApi.listen(config.writeApiPort,
    async () => {
      config.currentApp= "wapi";
      await db.connect(config.db);
      await cache.initialize(config.cache);
      logger.info(`Listening on port ${config.writeApiPort}!`);
    });