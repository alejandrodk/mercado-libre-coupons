import { Test, TestingModule } from '@nestjs/testing';
import { getFakeProduct } from './../factories/products.factory';
import { ProductGetDTO } from '../../src/application/dtos/productsGet.dto';
import { ProductsService } from '../../src/domain/services';
import { ProductRepository } from '../../src/infrastructure/repositories/products.repository';
import { random } from 'faker';
import { TCouponProduct } from '../../src/domain/interfaces/coupons.interfaces';

describe('Products Service', () => {
  let service: ProductsService;
  let fakeObject: TCouponProduct;

  beforeAll(async () => {
    const ProductsRepositoryMock = {
      getProductPrice: jest.fn(async (id: string) => new ProductGetDTO(getFakeProduct(id))),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductRepository,
          useValue: ProductsRepositoryMock,
        },
        ProductsService,
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    fakeObject = {
      prop1: 100,
      prop2: 200,
      prop3: 300,
    };
  });

  describe('Service status', () => {
    it('Should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('Test service methods', () => {
    it('Should return a valid product dto object', async () => {
      const result = await service.getProductById(random.word());

      expect(result).toBeInstanceOf(ProductGetDTO);
    });

    it('Should return a map object with the correct properties quantity', async () => {
      const key = random.word();
      const key2 = random.word();
      const key3 = random.word();

      const products = [key, key2, key3];
      const productsMap = await service.getProductFromArray(products);
      const result = Object.keys(productsMap);

      expect(result).toHaveLength(3);
    });

    it('Should ignore duplicated keys', async () => {
      const key = random.word();
      const key2 = random.word();

      const products = [key, key2, key, key2];
      const productsMap = await service.getProductFromArray(products);
      const result = Object.keys(productsMap);

      expect(result).toHaveLength(2);
    });

    it('Should remove item if its price is higher than the coupon', () => {
      const result = service.removeExpensiveProducts(fakeObject, 200);

      expect(result).not.toHaveProperty('prop3');
    });
  });
});
