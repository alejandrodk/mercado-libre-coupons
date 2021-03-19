import { CACHE_MANAGER, HttpService, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { ProductGetDTO } from '../../application/dtos/productsGet.dto';

@Injectable()
export class ProductRepository {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService
  ) {}
  private logger = new Logger(ProductRepository.name);

  async getProductPrice(productId: string): Promise<ProductGetDTO | null> {
    const API = this.configService.get('MELI_API');
    const productFromCache = await this.cacheManager.get(productId);

    if (productFromCache) return productFromCache as ProductGetDTO;

    try {
      const { data, status } = await this.httpService.get(encodeURI(API + productId)).toPromise();

      if (status === HttpStatus.OK) {
        await this.cacheManager.set(productId, new ProductGetDTO(data), { ttl: 1000 * 60 * 60 });
        return new ProductGetDTO(data);
      }
    } catch (error) {
      this.logger.error(error);
    }

    return null;
  }
}
