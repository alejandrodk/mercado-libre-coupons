import { HttpService, Injectable } from '@nestjs/common';
import { ProductGetDTO } from '../../application/dtos/productsGet.dto';
import { Endpoints } from '../../domain/enums/http.enums';

@Injectable()
export class ProductRepository {
  constructor(private readonly httpService: HttpService) {}

  async getProductPrice(id: string): Promise<ProductGetDTO | null> {
    const uri = encodeURI(Endpoints.MELI_API + id);
    const { data, status } = await this.httpService.get(uri).toPromise();
    return status === 200 ? new ProductGetDTO(data) : null;
  }
}
