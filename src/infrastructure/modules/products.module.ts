import { Module } from '@nestjs/common';
import { ProductsService } from '../../domain/services/products.service';

@Module({
  imports: [],
  providers: [ProductsService],
  exports: [],
})
export class ProductsModule {}
