import { CACHE_MANAGER, HttpService, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ProductGetDTO } from '../../application/dtos/productsGet.dto';
import { Endpoints } from '../../domain/enums/http.enums';

@Injectable()
export class ProductRepository {
  constructor(private readonly httpService: HttpService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getProductPrice(id: string): Promise<ProductGetDTO | null> {
    const product = await this.cacheManager.get(id);

    if (product) return product as ProductGetDTO;

    const uri = encodeURI(Endpoints.MELI_API + id);
    const { data, status } = await this.httpService.get(uri).toPromise();

    if (status === 200) {
      await this.cacheManager.set(id, new ProductGetDTO(data), { ttl: 1000 * 60 * 60 });
      return new ProductGetDTO(data);
    }

    return null;
  }
}
