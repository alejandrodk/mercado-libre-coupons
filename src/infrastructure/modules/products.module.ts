import { HttpModule, Module } from '@nestjs/common';
import { ProductsService } from '../../domain/services/products.service';
import { ProductRepository } from '../repositories/products.repository';

@Module({
  imports: [HttpModule],
  providers: [ProductsService, ProductRepository],
  exports: [ProductsService],
})
export class ProductsModule {}
