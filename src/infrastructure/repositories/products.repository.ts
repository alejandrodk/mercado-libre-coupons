import { CACHE_MANAGER, HttpService, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ProductGetDTO } from '../../application/dtos/productsGet.dto';
import { HttpEndpoints } from '../../domain/enums/http.enums';

@Injectable()
export class ProductRepository {
  constructor(private readonly httpService: HttpService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  private logger = new Logger(ProductRepository.name);

  async getProductPrice(productId: string): Promise<ProductGetDTO | null> {
    const product = await this.cacheManager.get(productId);

    if (product) return product as ProductGetDTO;

    const uri = encodeURI(HttpEndpoints.MELI_API + productId);
    const { data, status } = await this.httpService.get(uri).toPromise();

    if (status === HttpStatus.OK) {
      try {
        await this.cacheManager.set(productId, new ProductGetDTO(data), { ttl: 1000 * 60 * 60 });
      } catch (error) {
        this.logger.error(error);
      }
      return new ProductGetDTO(data);
    }

    return null;
  }
}
