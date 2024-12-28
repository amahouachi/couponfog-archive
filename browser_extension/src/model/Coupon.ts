export class Coupon{
  public id: number;
  public name: string;
  public code: string;
  public lastApplyDate: number;
  public lastApplyDiscount: number;

  constructor(id: number, name: string, code: string, lastApplyDate: number= 0, lastApplyDiscount: number= 0) {
    this.id= id;
    this.name= name;
    this.code= code;
    this.lastApplyDate= lastApplyDate;
    this.lastApplyDiscount= lastApplyDiscount;
  }
}
