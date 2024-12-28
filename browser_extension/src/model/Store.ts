import {Coupon} from "./Coupon";

export class StoreID{
  public id: number;
  public slug: string;
  public urlPatterns: Array<RegExp>;

  constructor(id: number, slug: string, urlPatterns: Array<RegExp>) {
    this.id= id;
    this.slug= slug;
    this.urlPatterns= urlPatterns;
  }
}
export class Store{
  public id: number;
  public slug: string;
  public name: string;
  public extensionSettings: object|null;
  public coupons: Array<Coupon>;

  constructor(store) {
    this.id= store.id;
    this.slug= store.slug;
    this.name= store.name;
    this.extensionSettings= store.extensionSettings;
    this.coupons= store.coupons;
  }
}
