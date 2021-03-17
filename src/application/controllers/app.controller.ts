/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { removeExpensiveProducts } from '../../domain/helpers';
import { CouponsService } from '../../domain/services/coupons.service';
import { ProductsService } from '../../domain/services/products.service';
import { CouponsGetDTO } from '../dtos';
import { PayloadToDtoPipe } from '../pipes/payloadToDto.pipe';

@Controller()
export class AppController {
  constructor(private productsService: ProductsService, private couponsService: CouponsService) {}
  @Get()
  sayHello(): string {
    return 'Hello World!!';
  }

  @Post('/coupons')
  //@UsePipes(PayloadToDtoPipe)
  async getProductsFromCoupon(@Body() { items, amount }: CouponsGetDTO): Promise<any> {
    const productsList = await this.productsService.getProductFromArray(items);
    const products = removeExpensiveProducts(productsList, amount);
    const result = this.couponsService.calculate(products, amount);
    return { result, products };
  }
}
