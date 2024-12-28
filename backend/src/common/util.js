const firebaseAdmin= require('firebase-admin');
const {config}= require('./config');
const {logger}= require('./logger');
const generate = require('nanoid/generate');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(config.firebase.account)
});

class Util {
  static getUnknownClientId(){
    return '0'.padEnd(config.nanoid.idLength,'0');
  }
  static isClientIdValid(clientId){
    return clientId && clientId.length===config.nanoid.idLength;
  }
  static getAffiliateUrl(trip, store, couponId){
    let url= store.url;
    if(couponId){
      for(const c of store.coupons){
        if(c.id==couponId){
          if(c.url){
            url= c.url;
          }
          break;
        }
      }
    }
    let monetizer= config.affiliate.defaultMonetizer;
    if(store.program && store.program.joined===1){
      monetizer= store.program.network;
    }
    switch (monetizer) {
      case "skimlinks":
        return config.affiliate.skimlinks.url+"?id="+config.affiliate.skimlinks.siteId+"&url="+encodeURIComponent(url)+"&xcust="+trip.id;
      case "viglink":
        return config.affiliate.viglink.url+"?u="+encodeURIComponent(url)+"&key="+config.affiliate.viglink.apiKey+"&cuid="+trip.id;
      case "cj":
        return config.affiliate.cj.tracker
            .replace('$websiteId',config.affiliate.cj.websiteId)
            .replace('$sid', trip.id)
            .replace('$url',url);
      case "ls":
        return config.affiliate.ls.tracker
            .replace('$publisherId',config.affiliate.ls.publisherId)
            .replace('$merchantId', store.program.externalId)
            .replace('$subid', trip.id)
            .replace('$url',encodeURIComponent(url));
      case "ir":
        return `${store.program.tracker}?subId1=${trip.id}&u=${encodeURIComponent(url)}`;
      default:
        return url;
    }
  }
  static uuid(){
    return generate(config.nanoid.alphabet, config.nanoid.idLength);
  }
  static toggleFcmSubscription(subscribe, tokens, topic, onSuccess, onError, onFailedTokens){
    let subscriptionFunction= 'subscribeToTopic';
    if(!subscribe){
      subscriptionFunction= 'unsubscribeFromTopic';
    }
    firebaseAdmin.messaging()[subscriptionFunction](tokens.map((token) => {return token.token}), topic)
        .then(function(response) {
          // See the MessagingTopicManagementResponse reference documentation
          // for the contents of response.
          if (response.failureCount > 0) {
            const failedTokens= [];
            response.errors.forEach(function(error) {
              console.log(error);
              logger.error(error);
              failedTokens.push(tokens[error.index]);
            });
            if(onFailedTokens){
              onFailedTokens(failedTokens);
            }
          } else {
            if(onSuccess){
              onSuccess();
            }
          }
        })
        .catch(function(error) {
          logger.error('Error '+subscribe?"subscribing":"unsubscribing"+' tokens to/from topic: '+ error);
          if(onError){
            onError(error);
          }
        });

  }
  static sendCouponsAlert(store,coupons,target='any'){
    const message = {
      data: {
        type: 'coupon-alert-full',
        store: JSON.stringify({id: store.id, name: store.name, slug: store.slug}),
        coupons: JSON.stringify(
            coupons.map(
                coupon => ({
                  id: coupon.id,
                  name: coupon.name,
                  type: coupon.type,
                  code: coupon.code,
                  discount: coupon.discount,
                  storeId: coupon.storeId,
                  storeName: coupon.storeName,
                  endDate: coupon.endDate
                })
            )
        ),
        target: target,
        timestamp: ''+Util.getTimestamp()
      },
      topic: `${store.slug}-promotions`,
    };
    if(JSON.stringify(message.data).length>config.firebase.maxPayloadLength){
      delete message.data.coupons;
      message.data.type= 'coupon-alert-summary';
      message.data.body= `${coupons.length} new coupons added`;
    }
    firebaseAdmin.messaging().send(message)
        .then((messageId) => {
          logger.debug(`message sent : ${messageId}`)
        })
        .catch((error) => {
          logger.error(`Error sending message to FCM : ${error}`);
        });
  }
  //check if a value or array of values are integers
  static isInteger(value){
    let values= value;
    if(!Array.isArray(values)){
      values= [value];
    }
    const regex = RegExp('^[0-9]+$');
    for(const val of values){
      if(!regex.test(val)){
        return false;
      }
    }
    return true;
  }
  static getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  static async sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds*1000));
  }
  static getTimestamp(date){
    if(!date){
      return Math.floor(Date.now() / 1000);
    }
    let timestamp= 0;
    try{
      timestamp = Math.floor(new Date(date).getTime() / 1000);
    }catch (err) {
    }
    if(timestamp>=2147483647){
      timestamp= 0;
    }
    return timestamp;
  }
  static assertFieldsInObject(fields, object, objectName, errorTag){
    for(const field of fields){
      Util.assertFieldInObject(field, object, objectName, errorTag);
    }
  }
  static assertFieldInObject(field, object, objectName, errorTag){
    if(! (field in object)){
      throw Error(errorTag+ ": Missing field in "+objectName+" : "+field);
    }
  }
  static timeout(promise, ms){
    const timeoutPromise = new Promise((resolve, reject) => {
      let id = setTimeout(() => {
        clearTimeout(id);
        reject('Timed out in '+ ms + 'ms.')
      }, ms)
    });
    return Promise.race([
      promise,
      timeoutPromise
    ])
  }
}
exports.Util= Util;
