import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { CouponsGetDTO } from '../dtos';
import { PayloadToDtoPipe } from '../pipes/payloadToDto.pipe';

@Controller()
export class AppController {
  @Get()
  sayHello(): string {
    return 'Hello World!!';
  }

  @Post('/coupons')
  @UsePipes(PayloadToDtoPipe)
  async getProductsFromCoupon(@Body() { items, amount }: CouponsGetDTO): Promise<any> {
    return;
  }
}
