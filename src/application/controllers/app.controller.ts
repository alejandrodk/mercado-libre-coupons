/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ProductsService } from '../../domain/services/products.service';
import { CouponsGetDTO } from '../dtos';
import { PayloadToDtoPipe } from '../pipes/payloadToDto.pipe';

@Controller()
export class AppController {
  constructor(private productsService: ProductsService) {}
  @Get()
  sayHello(): string {
    return 'Hello World!!';
  }

  @Post('/coupons')
  @UsePipes(PayloadToDtoPipe)
  async getProductsFromCoupon(@Body() { items, amount }: CouponsGetDTO): Promise<any> {
    const products = await this.productsService.getProductFromArray(items);
    return products;
  }
}
