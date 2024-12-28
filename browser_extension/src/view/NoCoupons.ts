import {NoOffersView} from "./NoOffers";

export class NoCouponsView extends NoOffersView {
  constructor() {
    super("Sorry, we have no active coupons for this site right now");
  }
}
