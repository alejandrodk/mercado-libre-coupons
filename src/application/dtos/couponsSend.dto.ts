export class CouponsSendDTO {
  public items_ids: string[];
  public total: number;

  constructor(items: string[], total: number) {
    this.items_ids = items;
    this.total = total;
  }
}
