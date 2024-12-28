import {Saving} from "../model/Saving";
import Message from "../util/Message";
import {Popup} from "./Popup";
import {Website} from "../core/Website";
import {Coupon} from "../model/Coupon";
import {Client} from "../model/Client";
import {Store} from "../model/Store";
//import * as $ from 'jquery/dist/jquery.min';

export class CouponsApplierView extends Popup {
  private originalTotal= 0;
  private previousTotal= 0;
  private totalApplied= 0;
  private preventCouponFormSubmit= false;
  private saving: Saving|null= null;
  private bestCoupon: Coupon|null= null;
  private website: Website;
  private store: Store;
  private abortCodesApplication= false;
  constructor(website: Website, store: Store) {
    super("html/applycodes.html");
    this.website= website;
    this.store= store;
    this.loaded.then(() => {
      this.css('#cf-apply-modal-wrapper',[{name: 'display', value: 'block'}]);
      this.originalTotal= website.getCurrentTotal(document);
      this.previousTotal= this.originalTotal;
    });
  }
  //quick access methods
  getSetting(name){
    return this.website.settings[name];
  }
  getCoupons(){
    return this.store.coupons;
  }
  getStoreId(){
    return this.store.id;
  }
  getStoreName(){
    return this.store.name;
  }
  async applyCodes(){
    this.saving= null;
    if(this.getSetting('methodApplyCode')==="form"){
      this.preventCouponFormSubmit= true;
      let $form = $(this.getSetting('selectorApplyCode')).closest('form');
      $form.on('submit', (e) => {
        if(this.preventCouponFormSubmit){
          e.preventDefault();
        }
      });
    }
    for(const coupon of this.getCoupons()){
      if(this.abortCodesApplication){
        return;
      }
      let {success, currentTotal} = await this.applyNextCode(Object.assign({}, coupon));
      if(success){
        this.recordCodeSuccess(coupon, currentTotal);
      }
      this.totalApplied++;
      this.previousTotal= currentTotal;
    }
    this.showVerificationResults();
  }
  refreshProgress(){
    this.text('#cf-applying-code-message',`Trying code ${this.totalApplied+1} of ${this.getCoupons().length}`);
    let width= Math.floor(((this.totalApplied+1)*100)/this.getCoupons().length);
    this.css('#cf-apply-progress-status',[{name: 'width', value: `${width}%`}]);
    //let elem = document.getElementById("cf-apply-progress-status");
    //elem.style.width = width + '%';
  }
  checkCodeSuccess(currentTotal: number, originalTotal: number, previousTotal: number) : number {
    if(currentTotal<originalTotal){
      if(currentTotal!==previousTotal){
        return 1;
      }else if(this.getSetting('checkSuccessExpression')!==""){
        const _this= this;
        return eval(this.getSetting('checkSuccessExpression'));
      }
    }
    return 0;
  }
  recordCodeSuccess(coupon, currentTotal: number) {
    const discount= parseFloat((this.originalTotal-currentTotal).toFixed(2));
    const saving= new Saving(this.getStoreId(), coupon.id, currentTotal, discount);
    if(this.saving==null || currentTotal<this.saving.total){
      this.saving= saving;
      this.bestCoupon= coupon;
    }
    chrome.runtime.sendMessage(new Message(Message.ID_CREATE_SAVING, {clientId: Client.getId(), saving}));
  }
  async applyNextCode(coupon) {
    this.refreshProgress();
    const currentTotal= await this.website.applyCode(coupon.code);
    const success= this.checkCodeSuccess(currentTotal, this.originalTotal, this.previousTotal);
    return {success, currentTotal};
  }
  open() {
    this.abortCodesApplication= false;
    super.open();
  }

  close() {
    this.preventCouponFormSubmit= false;
    this.abortCodesApplication= true;
    if(this.totalApplied===this.getCoupons().length){
      if(this.saving!=null && this.bestCoupon!=null && this.website.settings.methodApplyCodeAsUser!=='click'){
        this.website.applyCodeAsUser(this.bestCoupon.code);
      }
    }
    this.previousTotal= this.originalTotal;
    this.totalApplied= 0;
    this.saving= null;
    this.bestCoupon= null;
    super.close();
  }
  showVerificationResults() {
    //this.$html.find('#cf-applyingCode-headline').hide();
    this.hide('#cf-applying-code-message');
    this.hide('#cf-apply-progress-wrapper');
    this.css('#cf-apply-modal-headline', [{name: "font-size",value: "30px"},{name: 'font-weight', value: '700'}]);
    this.hide('#cf-apply-modal-headline');
    if(this.bestCoupon==null){
      //$headline.text("Arghh!");
      //$headline.css("color","#6d8590");
      this.show('#cf-applycode-failed');
    }else{
      //$headline.text(this.bestCoupon.code);
      //$headline.css("color","#0d900d");
      const $successImg= this.find('#cf-apply-success-img') as HTMLImageElement;
      $successImg.src= `chrome-extension://${chrome.runtime.id}/images/apply-code-success.gif`;
      this.show('#cf-apply-success-img');
      this.text('#cf-cart-code',`${this.bestCoupon.code}`);
      this.text('#cf-cart-saving',`$${this.saving?.discount.toFixed(2)}`);
      this.text('#cf-cart-before-code',`$${this.originalTotal.toFixed(2)}`);
      this.text('#cf-cart-after-code',`$${this.saving?.total.toFixed(2)}`);
      this.show('#cf-applycode-success');
      if(this.website.settings.methodApplyCodeAsUser==='click'){
        this.website.applyCodeAsUser(this.bestCoupon.code);
      }
      //this.reportSaving();
    }
  }
  /*
  reportSaving() {
    const message= {
        action: "create_saving",
        saving: JSON.stringify(session.saving)
      };
    chrome.runtime.sendMessage(
      message, (respone) => {}
    );
  }*/
}
