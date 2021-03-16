import { Injectable, Logger } from '@nestjs/common';
import { ProductGetDTO } from '../../application/dtos/productsGet.dto';
import { ProductRepository } from '../../infrastructure/repositories/products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductRepository) {}
  private logger = new Logger(ProductsService.name);

  async getProductById(productId: string): Promise<ProductGetDTO | null> {
    return this.productsRepository.getProductPrice(productId);
  }

  async getProductFromArray(items: string[]): Promise<Record<string, number>> {
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
}
