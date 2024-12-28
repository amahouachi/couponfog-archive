import {Popup} from "./Popup";

export class NoOffersView extends Popup{
  constructor(message) {
    super("html/nooffers.html");
    this.loaded.then(() => {
      this.text('#cf-no-offers-message',message);
    });
  }
}
