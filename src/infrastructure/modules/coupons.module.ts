import { Module } from '@nestjs/common';
import { CouponsService } from '../../domain/services/coupons.service';
import { ProductsModule } from './products.module';

@Module({
  imports: [ProductsModule],
  providers: [CouponsService],
  exports: [CouponsService],
})
export class CouponsModule {}
