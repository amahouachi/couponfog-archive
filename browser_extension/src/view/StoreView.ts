import Message from "../util/Message";
import {Popup} from "./Popup";
import {Website} from "../core/Website";
import {Store} from "../model/Store";
import {CouponView} from "./CouponView";
import {Client} from "../model/Client";
import {CouponsApplierView} from "./CouponsApplier";

export class StoreView extends Popup {
  private website: Website;
  private store: Store;
  constructor(store: Store, website: Website, hideCoupons= false) {
    super("html/coupons.html");
    this.store= store;
    this.website= website;
    this.ready.then(() => {
      this.text('#couponsTotal',`${this.store.coupons.length}`);
      this.text('#storeName',this.store.name);
      for(const coupon of this.store.coupons) {
        const couponView= new CouponView(this,coupon);
        couponView.loaded.then(() => {
          this.append('.cf-coupons', couponView.$html);
        });
      }
      if(this.website.shouldShowAutoApply()) {
        this.show('#applyCodesDiv');
        this.find('#cf-coupons-apply-button').addEventListener('click', () => {
          this.close();
          const couponsApplier= new CouponsApplierView(this.website, this.store);
          couponsApplier.loaded.then(() => {
            couponsApplier.applyCodes();
          });
          chrome.runtime.sendMessage(new Message(Message.ID_OPEN_AFFILIATE_TAB, {
              clientId: Client.getId(),
              storeId: this.store.id
            })
          );

        });
        this.find('#cf-coupons-apply-show-coupons').addEventListener('click', () => {
          this.show('.cf-coupons');
          this.hide('#cf-coupons-apply-show-coupons');
        });
      }else{
        this.hide('#applyCodesDiv');
      }
      if(!hideCoupons) {
        this.show('.cf-coupons');
        this.hide('#cf-coupons-apply-show-coupons');
      }else{
        this.show('#cf-coupons-apply-show-coupons');
        this.hide('.cf-coupons');
        this.css('#cf-content', [{name: 'height',value: 'auto'}]);
      }
    });
  }
}
