/* eslint-disable prettier/prettier */
import { Body, Controller, HttpException, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { CouponsService } from '../../domain/services/coupons.service';
import { ProductsService } from '../../domain/services/products.service';
import { CouponsGetDTO, CouponsSendDTO } from '../dtos';
import { PayloadToDtoPipe, PayloadValidationPipe } from '../pipes';
import { PayloadSchema } from '../../domain/schemas';
import { HttpMessages } from '../../domain/enums/http.enums';

@Controller()
export class AppController {
  constructor(private productsService: ProductsService, private couponsService: CouponsService) {}

  @Post('/coupons')
  @UsePipes(new PayloadValidationPipe(PayloadSchema), PayloadToDtoPipe)
  async getProductsFromCoupon(@Body() { items, amount }: CouponsGetDTO): Promise<any> {
    const productsList = await this.productsService.getProductFromArray(items);
    const cheappestProduct = this.productsService.getCheappestProductPrice(productsList);

    if (cheappestProduct > amount) throw new HttpException(HttpMessages.INSUFFICIENT_AMOUNT, HttpStatus.NOT_FOUND);

    const filteredProducts = this.productsService.removeExpensiveProducts(productsList, amount);
    const { total, products } = this.couponsService.calculate(filteredProducts, amount);

    return new CouponsSendDTO(products, total);
  }
}
