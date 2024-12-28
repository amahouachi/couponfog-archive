import {Utils} from "../util/Utils";
import {HtmlView} from "./HtmlView";

export class CouponView extends HtmlView {
  private parent;
  private coupon;
  constructor(parent,coupon) {
    super("html/coupon.html");
    this.parent=parent;
    this.coupon=coupon;
    this.loaded.then(() => {
      this.text('.cf-promocode', this.coupon.code);
      if(this.coupon.name && this.coupon.name!==""){
        this.text('.cf-coupon-name', this.coupon.name);
      }
      if("lastApplyDate" in this.coupon){
        let timeSince= Utils.getTimeSince(this.coupon.lastApplyDate);
        if(timeSince){
          this.text('.cf-coupon-lastused',`Last used ${timeSince} ago to save $${this.coupon.lastApplyDiscount.toFixed(2)}`);
          this.css('.cf-coupon-lastused', [{name: 'color', value: '#4CAF50'}]);
        }
      }
      this.$html.addEventListener('click', evt => {
        this.copyCouponToClipboard();
      });
    });
  }

  copyCouponToClipboard() {
    this.copyToClipboard(this.coupon.code, this.$html as HTMLElement);
    const copiedMessageSelector= '.copied';
    this.parent.hide(copiedMessageSelector);
    this.show(copiedMessageSelector);
    let _this= this;
    setTimeout(function () {
      _this.hide(copiedMessageSelector);
    },1500);
  }
}
