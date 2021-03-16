export class ProductGetDTO {
  public id: string;
  public title: string;
  public price: number;

  constructor(body: any) {
    this.id = body.id;
    this.title = body.title;
    this.price = body.price;
  }
}
