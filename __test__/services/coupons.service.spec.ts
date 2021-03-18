import { Test, TestingModule } from '@nestjs/testing';
import { CouponsService, ProductsService } from '../../src/domain/services';
import { ProductRepository } from '../../src/infrastructure/repositories/products.repository';
import { CouponsResult, CouponsValues } from '../enums/coupons.enums';
import { fakeItemsMap, fakeOrderedItemsArray, fakeProductsDatabase } from '../mocks';

describe('Coupons Service', () => {
  let service: CouponsService;

  beforeAll(async () => {
    const ProductsRepositoryMock = {
      getProductPrice: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductRepository,
          useValue: ProductsRepositoryMock,
        },
        CouponsService,
        ProductsService,
      ],
    }).compile();

    service = module.get<CouponsService>(CouponsService);
  });

  describe('Service status', () => {
    it('Should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('[getProductsAvailablesByCouponAmount]', () => {
    it('Should return a valid object with the result', () => {
      const { products, total } = service.getProductsAvailablesByCouponAmount(
        fakeOrderedItemsArray,
        CouponsValues.VALID_PRICE
      );

      expect(products.length).toBeGreaterThan(CouponsResult.NO_PRODUCTS);
      expect(total).toBeGreaterThan(CouponsResult.NO_AMOUNT);
    });

    it('Should return 0 if the coupon received is too low', () => {
      const { total } = service.getProductsAvailablesByCouponAmount(
        fakeOrderedItemsArray,
        CouponsValues.INSUFFICIENT_AMOUNT
      );

      expect(total).toBe(CouponsResult.NO_AMOUNT);
    });

    it('Should calculate the correct total amount', () => {
      const { products, total } = service.getProductsAvailablesByCouponAmount(fakeOrderedItemsArray, 3000);
      const expectedTotal = products.reduce((acc, curr) => {
        const currentProd = fakeProductsDatabase.find(product => product.id === curr);
        acc += currentProd?.price || 0;
        return acc;
      }, 0);

      expect(total).toBe(expectedTotal);
    });
  });

  describe('[calculate]', () => {
    it('Should return an object with the correct format', () => {
      const { products, total } = service.calculate(fakeItemsMap, CouponsValues.VALID_PRICE);

      expect(products.length).toBeGreaterThan(CouponsResult.NO_PRODUCTS);
      expect(total).toBeGreaterThan(CouponsResult.NO_AMOUNT);
    });

    it('Should return the max quantity of products according received coupon amount', () => {
      const EXPECTED_PRODUCTS_QUANTITY = 2;

      const { products } = service.calculate(fakeItemsMap, CouponsValues.CHEAP_AMOUNT);

      expect(products.length).toBe(EXPECTED_PRODUCTS_QUANTITY);
    });

    it('Should return the correct coupon amount', () => {
      const EXPECTED_RESULT = 119;

      const { total } = service.calculate(fakeItemsMap, CouponsValues.CHEAP_AMOUNT);

      expect(total).toBe(EXPECTED_RESULT);
    });
  });
});
