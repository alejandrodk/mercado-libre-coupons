import { Injectable, Logger } from '@nestjs/common';
import { ProductGetDTO } from '../../application/dtos/productsGet.dto';
import { ProductRepository } from '../../infrastructure/repositories/products.repository';
import { TCouponProduct } from '../interfaces/coupons.interfaces';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductRepository) {}
  private logger = new Logger(ProductsService.name);

  async getProductById(productId: string): Promise<ProductGetDTO | null> {
    return this.productsRepository.getProductPrice(productId);
  }

  async getProductFromArray(items: string[]): Promise<TCouponProduct> {
    return await items.reduce(async (prevPromise, productId): Promise<any> => {
      try {
        let acc = await prevPromise;
        const { id, price } = (await this.getProductById(productId as string)) || {};
        return Promise.resolve(id && price ? (acc = { ...acc, [id]: price }) : acc);
      } catch (error) {
        this.logger.error(error);
      }
    }, Promise.resolve({}) as any);
  }

  removeExpensiveProducts(items: TCouponProduct, maxPrice: number): TCouponProduct {
    return Object.entries(items)
      .filter(([key, value]) => value <= maxPrice)
      .reduce((acc, curr) => {
        const [_key, _value] = curr;
        acc[_key] = _value;
        return acc;
      }, {} as any);
  }

  sortProductsByPrice(items: TCouponProduct): [string, number][] {
    return Object.entries(items).sort((a, b) => b[1] - a[1]);
  }

  getCheappestProductPrice(items: TCouponProduct): number {
    return this.sortProductsByPrice(items)
      .flatMap(i => i)
      .pop() as number;
  }
}
