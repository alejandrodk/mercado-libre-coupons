export class CouponsGetDTO {
  public items: string[];
  public amount: number;

  constructor(items_id: string[], amount: number) {
    this.items = items_id;
    this.amount = amount;
  }
}
