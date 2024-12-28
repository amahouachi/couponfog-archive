const db= require('../common/db');
const Util= require('../common/util').Util;
const rcg= require('./rcg').RandomCouponGenerator;

/*
Coupon : {
  name : ...,
  code : ...,
  startDate : ...,
  endDate : ...,
  manual : 1 manual, 0 crawled
  lastHeartbeat : last time it has been crawled,
  store : {
    name : ...
    domain : ...
  }
}
 */
class Coupon{

  constructor(obj){
    this.id= null;
    for(const prop of ['storeId','creationDate', 'startDate' , 'endDate', 'manual', 'score', 'lastHeartbeat', 'lastStatusDate', 'storeHeartbeat']){
      this[prop]= 0;
    }
    for(const prop of ['name', 'code', 'description', 'details']){
      this[prop]= '';
    }
    this.discount= {type: '', value: ''};
    this.xref= [];
    this.type= 'code';
    this.url= null;
    for(const prop of Object.keys(obj)) {
      this[prop]= obj[prop];
    }
  }
  static decodeHTML(str){
    return str.replace(/&#([0-9]{1,3});/gi, function(match, num) {
      return String.fromCharCode(parseInt(num));
    });
  }
  static cleanupName(name){
    let cleanName= name.replace(/\n/ig,' ')
        .replace(/\s+/ig, ' ')
        .replace(/&amp;/g,'&')
        .replace(/\.$/ig,'')
        .trim();
    cleanName= Coupon.randomizeName(cleanName);
    cleanName= Coupon.upperCaseWords(cleanName);
    cleanName= Coupon.decodeHTML(cleanName);
    return cleanName;
  }
  static randomizeName(name) {
    let randomName = name;
    const patternTakeXOff= /^take\s(\$[0-9]+|[0-9]+%)\soff/i;
    const patternGetXOff= /^get\s(\$[0-9]+|[0-9]+%)\soff/i;
    const patternReceiveXOff= /^receive\s(\$[0-9]+|[0-9]+%)\soff/i;
    const patternEnjoyXOff= /^enjoy\s(\$[0-9]+|[0-9]+%)\soff/i;
    const patternXOff= /^(\$[0-9]+|[0-9]+%)\soff/i;
    const patternExtraOff= /^extra\s(\$[0-9]+|[0-9]+%)\soff/i;
    const patternUpTo= /^up\sto\s(\$[0-9]+|[0-9]+%)\soff/i;
    const patternMinSpend= /minimum spend/i;
    const patternAnyOrder= /any (order|purchase)/i;
    const patternSaveOn= /save (\$[0-9]+|[0-9]+%) on/i;
    const patternSaveWhen= /save (\$[0-9]+|[0-9]+%) when/i;
    const patternDollarPlus= /(\$[0-9]+)\+/i;
    const patternDollarOrMore= /(\$[0-9]+)\sor\smore/i;
    if (randomName.match(patternXOff)) {
      randomName= randomName.replace(patternXOff, 'take $1 off');
    }else if(randomName.match(patternTakeXOff)){
      randomName= randomName.replace(patternTakeXOff, 'get $1 off');
    }else if(randomName.match(patternGetXOff)){
      randomName= randomName.replace(patternGetXOff, 'take $1 off');
    }else if(randomName.match(patternReceiveXOff)){
      randomName= randomName.replace(patternReceiveXOff, 'get $1 off');
    }else if(randomName.match(patternEnjoyXOff)){
      randomName= randomName.replace(patternEnjoyXOff, 'take $1 off');
    }else if(randomName.match(patternExtraOff)){
      randomName= randomName.replace(patternExtraOff, 'get extra $1 off');
    }
    randomName = randomName.replace(patternMinSpend, 'minimum purchase');
    randomName = randomName.replace(patternAnyOrder, 'all $1s');
    if (randomName.match(/purchase/gi)) {
      randomName = randomName.replace(/purchase/gi, 'order');
    } else if (randomName.match(/order/gi)) {
      randomName = randomName.replace(/order/gi, 'purchase');
    }
    randomName = randomName.replace(patternSaveOn, 'take $1 off');
    randomName = randomName.replace(patternSaveWhen, 'get $1 off when');
    randomName = randomName.replace(patternUpTo, 'get up to $1 off');
    if(randomName.match(patternDollarPlus)){
      randomName = randomName.replace(patternDollarPlus, '$1 or more');
    }else{
      randomName = randomName.replace(patternDollarOrMore, '$1+');
    }
    if (randomName.match(/coupon code/i)) {
      randomName = randomName.replace(/coupon code/i, 'promo code');
    } else if (randomName.match(/promo code/gi)) {
      randomName = randomName.replace(/promo code/i, 'coupon code');
    }
    return randomName;
  }
  static upperCaseWords(str) {
    var words = str.toLowerCase().split(' ');
    for (let i=0; i<words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
    }
    return words.join(' ');
  }
  //update existingCoupon if provided
  //otherwise create a new coupon
  async save(existingCoupon, heartbeat){
    if(existingCoupon!=null){
      //update heartbeat
      existingCoupon.lastHeartbeat= heartbeat;
      //if it now has a name use it
      if(existingCoupon.name==='' && this.name!==''){
        existingCoupon.name= this.name;
      }
      //if it now has an endDate use it
      if(existingCoupon.endDate===0 && this.endDate>0){
        existingCoupon.endDate= this.endDate;
      }
      //add providers if any missing
      for(const providerName of this.xref){
        if(! (existingCoupon.xref.includes(providerName))){
          existingCoupon.xref.push(providerName);
        }
      }
      existingCoupon.calculateScore();
      existingCoupon.calculateDiscount();
      existingCoupon.calculateStatus();
      await db.coupons.update(existingCoupon);
    }else{
      this.lastHeartbeat= heartbeat;
      this.creationDate= heartbeat;
      if(this.startDate===0){
        this.startDate= heartbeat;
      }
      this.calculateScore();
      this.calculateDiscount();
      this.calculateStatus();
      this.generateRandomDescription();
      try{
        this.id= await db.coupons.create(this);
      }catch (e) {
        console.log(e);
      }
    }
  }
  //this must be used to change status
  moveToStatus(status){
    if(this.status===status){
      return;
    }
    const now = Util.getTimestamp();
    this.status= status;
    this.lastStatusDate= now;
  }
  calculateDiscount(){
    const patternPercentOff= /([0-9]{1,2}%)\s(?:off|on)/i;
    const patternDollarOff= /(\$[0-9.,]+)\soff/i;
    const patternFreeShipping= /free\s.*?(ship|delivery)/i;
    const patternFreeTrial= /free\strial/i;
    const patternFreeGift= /free\s/i;
    const patternBogo= /bogo|buy.*?get/i;
    const patternRebate= /rebate/i;
    const patternPriceFrom= /from\s(\$[0-9.,]+)/i;
    this.discount= {
      type: Coupon.DISCOUNT_DEAL,
      value: ''
    };
    let matches= this.name.match(patternBogo);
    if(matches){
      this.discount.type= Coupon.DISCOUNT_BOGO;
      return;
    }
    matches= this.name.match(patternPercentOff);
    if(matches){
      this.discount.type= Coupon.DISCOUNT_PERCENTOFF;
      this.discount.value= matches[1];
      return;
    }
    matches= this.name.match(patternDollarOff);
    if(matches){
      this.discount.type= Coupon.DISCOUNT_DOLLAROFF;
      this.discount.value= matches[1];
      return;
    }
    matches= this.name.match(patternFreeShipping);
    if(matches){
      this.discount.type= Coupon.DISCOUNT_FREESHIP;
      return;
    }
    matches= this.name.match(patternFreeTrial);
    if(matches){
      this.discount.type= Coupon.DISCOUNT_FREETRIAL;
      return;
    }
    matches= this.name.match(patternFreeGift);
    if(matches){
      this.discount.type= Coupon.DISCOUNT_FREEGIFT;
      return;
    }
    matches= this.name.match(patternRebate);
    if(matches){
      this.discount.type= Coupon.DISCOUNT_REBATE;
      return;
    }
    matches= this.name.match(patternPriceFrom);
    if(matches){
      this.discount.type= Coupon.DISCOUNT_PRICEFROM;
      this.discount.value= matches[1];
      return;
    }
  }
  calculateScore(){
    this.score= this.xref.length;
    if(this.endDate>0){
      this.score+= 2;
    }
    if(this.name!=''){
      this.score+=2;
    }
    this.score= this.score/10;
  }
  isExpired(){
    const now= Util.getTimestamp();
    if(this.endDate>0 && this.endDate<(now-86400)){
      return true;
    }
    return false;
  }
  isGarbage(){
    const garbageRegex= /(needed|required)/ig;
    const nameRegex= /\s+/;
    if(this.code && this.code.length<=2){
      return true;
    }
    if(garbageRegex.test(this.code)){
      return true;
    }
    if(!nameRegex.test(this.name)){
      return true;
    }
    if(this.name.length>512){
      return true;
    }
    return false;
  }
  calculateStatus(){
    const now= Util.getTimestamp();
    if(this.endDate>0 && this.endDate<(now-86400)){
      this.moveToStatus(Coupon.STATUS_EXPIRED);
      return;
    }
    if(this.name!==''){
      this.moveToStatus(Coupon.STATUS_PUBLISHED)
    }else{
      this.moveToStatus(Coupon.STATUS_PUBLISHED_NONAME)
    }
  }
  generateRandomDescription(){
    if(this.name!==''){
      this.description= rcg.generateRandomDescription(this);
    }
  }
}

Coupon.STATUS_DRAFT= 0;
Coupon.STATUS_PUBLISHED= 1;
Coupon.STATUS_PUBLISHED_NONAME= 2;
Coupon.STATUS_EXPIRED= 3;
Coupon.STATUS_REMOVED= 4;

Coupon.DISCOUNT_PERCENTOFF= 'percentOff';
Coupon.DISCOUNT_DOLLAROFF= 'dollarOff';
Coupon.DISCOUNT_FREESHIP= 'freeShipping';
Coupon.DISCOUNT_FREEGIFT= 'freeGift';
Coupon.DISCOUNT_BOGO= 'bogo';
Coupon.DISCOUNT_REBATE= 'rebate';
Coupon.DISCOUNT_PRICEFROM= 'priceFrom';
Coupon.DISCOUNT_FREETRIAL= 'freeTrial';
Coupon.DISCOUNT_DEAL= 'deal';
Coupon.LIST_STATUS= [Coupon.STATUS_DRAFT,Coupon.STATUS_PUBLISHED,Coupon.STATUS_REMOVED];

exports.Coupon= Coupon;
