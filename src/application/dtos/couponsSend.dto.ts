export class CouponsSendDTO {
  public items_id: string[];
  public total: number;

  constructor(items: string[], total: number) {
    this.items_id = items;
    this.total = total;
  }
}
