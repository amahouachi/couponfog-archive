class RandomCouponGenerator{

  static getRandomElement(array){
    return array[Math.floor(Math.random() * array.length)];
  }
  static generateCoupon(){
    const monthNames = ["JAN", "FEB", "MARCH", "APRIL", "MAY", "JUNE",
      "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"
    ];
    const seasons= ["WINTER","WINTER","SPRING","SPRING","SPRING","SUMMER",
      "SUMMER","SUMMER","AUTUMN","AUTUMN","AUTUMN","WINTER"];
    const verbs= ['', 'Get ', 'Take ',' Enjoy ', 'Grab '];
    const prefixes= ['','Extra ','Additional ','Up to '];
    const percentOffs= [5,10,15,20,25,30,35,40,45,50,55,60,65,70];
    const subjectPrefixes= ['Your ','Any '];
    const subjects= ['Order','Purchase'];
    const codePrefixes= ['PROMO','SAVE','GET','TAKE','HOT',
      'CUT','LESS','OFF','MORE','DISCOUNT','DISC','CATCH',
      'PUMPKIN','FRIENDS','FORYOU','FORME','FAMILY','SHINE',
      'WINDY','SHINY','SHOP','GETMORE','SAVEMORE','EXTRA',
      'XTRA','YAY','BONUS','VIP','SUP','FRESH','HOORAY',
      'CYBER','LOVE','FAVE','CATCH'];

    const verbsIndex= Math.floor(Math.random() * 3);
    const prefixesIndex= Math.floor(Math.random() * 4);
    const percentOffsIndex= Math.floor(Math.random() * 14);
    const subjectPrefixesIndex= Math.floor(Math.random() * 2);
    const subjectsIndex= Math.floor(Math.random() * 2);
    const codesIndex= Math.floor(Math.random() * 11);

    let name= verbs[verbsIndex]+prefixes[prefixesIndex];
    name+= percentOffs[percentOffsIndex]+'% Off ';
    name+= subjectPrefixes[subjectPrefixesIndex];
    name+= subjects[subjectsIndex];
    let code= '';
    if(subjectsIndex==0){
      code= codePrefixes[codesIndex]+percentOffs[percentOffsIndex];
    }else{
      code= percentOffs[percentOffsIndex]+codePrefixes[codesIndex];
    }

    console.log(name+ ' with code '+code);

  }
  static synonymHurry(){
    return this.getRandomElement(['Hurry up','Act immediately','Shop now','Don\'t wait any longer']);
  }
  static synonymOffer(discount){
    let offer= this.getRandomElement(RandomCouponGenerator.discountAdjectives);
    if(discount){
      switch (discount.type) {
        case 'percentOff':
          offer+= ' '+discount.value+' Off';
          break;
        case 'dollarOff':
          offer+= ' '+discount.value+' Off';
          break;
        case 'bogo':
          offer+= ' BOGO';
          break;
        case 'freeShipping':
          offer+= ' Free Shipping';
          break;
        case 'freeGift':
          offer+= ' Free Gift';
          break;
      }
    }
    offer+= ' ' +  this.getRandomElement(['deal','discount','offer','sale','coupon','promo','promotion']);
    return offer;
  }
  static saveYourMoney(){
    return this.getRandomElement(RandomCouponGenerator.saveYourMoneySynonyms);
  }
  static savingMoney(){
    return this.getRandomElement(['saving your money','sparing your money','saving your pocket','spending less','scoring the perfect deals']);
  }
  static shoppingTrip(){
    return this.getRandomElement(['shopping trip','shopping spree']);
  }
  static discountAdjective(){
    return this.getRandomElement(RandomCouponGenerator.discountAdjectives);
  }
  static wayToSaveAdjective(){
    return this.getRandomElement(RandomCouponGenerator.waysToSaveAdjectives);
  }
  static generateRandomDescription(coupon){
    const useDomain= Math.floor(Math.random() * 2);
    const firstParts= [
        this.getRandomElement(['Are You Looking for','Looking for','Are You Seeking','Are You Seeking','Seeking',
          'Are You Searching for','Searching for','Do You Want','Want to know']) +
        ' all the '+
        this.wayToSaveAdjective() +
        ' ways to '+
        this.saveYourMoney() +
        ' at STORE ?',

        'Don’t miss this '+
        this.synonymOffer(coupon.discount) +
        ' at STORE !',

        'Only at STORE for a '+
        this.getRandomElement(['short','limited','restricted','certain'])+
        ' period of time!',

        'There is some '+
        this.getRandomElement(['special','good','great','awesome','sweet'])+
        ' kind of legal steal going on at STORE!',

        this.getRandomElement(['Are you up for a ','Up for a ', 'Are you ready for a ', 'Ready for a '])+
        this.getRandomElement(['great ','wonderful ','terrific ','awesome ','crazy ', 'thrilling '])+
        this.shoppingTrip()+
        ' while '+
        this.savingMoney() +
        ' at STORE ?',

        'Don’t be the one to miss out on this '+
        this.getRandomElement(['sweet','unique','awesome','great','nice','wonderful'])+
        ' opportunity to save at STORE!',

        'What about a '+
        this.getRandomElement(['wonderful','lovely','terrific','great'])+
        ' shopping spree at STORE '+
        this.getRandomElement(['with your pockets staying full?','without ruining yourself?','without killing your pocket?']),

        this.getRandomElement(['Enjoy ','Take advantage of ','Delight yourself with ','Pick up some '])+' '+
        this.discountAdjective()+
        this.getRandomElement([' savings ',' discounts ',' promotions '])+
        this.getRandomElement(['today at STORE!','when using STORE top coupons!','with STORE promo codes!',
        'with this promotion code', 'with this STORE promo code','using this STORE coupon'])
    ];
    const secondParts= [
      this.synonymHurry() +
      ' because this '+
      this.synonymOffer(coupon.discount)+
      this.getRandomElement([' is around for ',' is valid for ',' is available for '])+
      this.getRandomElement(['a limited time only','a short period of time','few days only']),

      'Take this opportunity today and don\'t let this '+
      this.synonymOffer(coupon.discount)+
      ' run away !',

      'Let this '+
      this.synonymOffer(coupon.discount)+
      ' make your day !',

      'This '+
      this.synonymOffer(coupon.discount)+
      ' '+
      this.getRandomElement(['will make your day','is just what you have been looking for','is just what you need']) +
      '!',

      'Shop '+
      this.getRandomElement(['smart','clever','wise'])+
      ' and take advantage of this ' +
      this.synonymOffer(coupon.discount)+
      this.getRandomElement([' while it lasts!',' while it is still available!',' while it is still valid!']),

    ];
    return this.getRandomElement(firstParts).replace('STORE', useDomain?coupon.store.domain:coupon.store.name)+ ' '+this.getRandomElement(secondParts);
  }
}
RandomCouponGenerator.discountAdjectives= ['sweet','unique','awesome','great','nice','wonderful','big', 'huge','thrilling','crazy','excellent','fantastic'];
RandomCouponGenerator.waysToSaveAdjectives= ['fresh','new','great','best','smart','perfect','easy','hot','slick','clever','thrilling'];
RandomCouponGenerator.saveYourMoneySynonyms= ['save money','save your money','spare your money','spend less','stock up and save',
  'shop and save','shop for less','shop on budget','score deals',
  'get discounts','score discounts','get savings','score the perfect deals'];
exports.RandomCouponGenerator= RandomCouponGenerator;

