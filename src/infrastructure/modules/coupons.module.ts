import { Module } from '@nestjs/common';
import { CouponsService } from '../../domain/services/coupons.service';

@Module({
  imports: [],
  providers: [CouponsService],
  exports: [],
})
export class CouponsModule {}