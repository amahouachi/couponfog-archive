export class Saving{
  public storeId: number;
  public couponId: number;
  public total: number;
  public discount: number;

  constructor(storeId: number, couponId: number, total: number, discount: number) {
    this.storeId= storeId;
    this.couponId= couponId;
    this.total= total;
    this.discount= discount;
  }
}
