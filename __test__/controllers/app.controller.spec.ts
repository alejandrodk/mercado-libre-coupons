import { fakeCouponsGetDTO } from './../mocks';
import { ProductRepository } from './../../src/infrastructure/repositories/products.repository';
import { CouponsService, ProductsService } from '../../src/domain/services';
import { AppController } from './../../src/application/controllers';
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { CouponsSendDTO } from '../../src/application/dtos';
import { random } from 'faker';
import { ICouponsObject } from '../../src/domain/interfaces/coupons.interfaces';

describe('AppController', () => {
  let appController: AppController;
  let productsService: ProductsService;
  let couponsService: CouponsService;

  const ProductsRepositoryMock = {
    getProductPrice: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: ProductRepository,
          useValue: ProductsRepositoryMock,
        },
        ConfigService,
        CouponsService,
        ProductsService,
      ],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    productsService = moduleRef.get<ProductsService>(ProductsService);
    couponsService = moduleRef.get<CouponsService>(CouponsService);
  });

  describe('Controller status', () => {
    it('Should be defined', () => {
      expect(appController).toBeDefined();
    });
  });

  describe('Check Services status', () => {
    it('Should productsService to be defined', async () => {
      expect(productsService).toBeDefined();
    });
    it('Should couponsService to be defined', async () => {
      expect(productsService).toBeDefined();
    });
  });

  describe('getProductsFromCoupon', () => {
    it('Should return object with the correct format', async () => {
      const items = [random.word()];
      const amount = random.number();
      const data: ICouponsObject = {
        products: items,
        total: amount,
      };

      jest.spyOn(couponsService, 'calculate').mockImplementation((): ICouponsObject => data);
      const result = await appController.getProductsFromCoupon({ items, amount });

      expect(result).toHaveProperty('items_ids');
      expect(result).toHaveProperty('total');
      expect(result).toMatchObject({
        items_ids: items,
        total: amount,
      });
    });

    it('Should calculate the total amount correctly according received products', async () => {
      const expectedData = {
        products: ['MLA904991613', 'MLA875630461'],
        total: 5607.99,
      };
      jest.spyOn(couponsService, 'calculate').mockImplementation((): ICouponsObject => expectedData);

      const result = await appController.getProductsFromCoupon(fakeCouponsGetDTO);
      const expectedResult = new CouponsSendDTO(expectedData.products, expectedData.total);

      expect(result).toStrictEqual(expectedResult);
    });

    it('Should return a valid DTO', async () => {
      const expectedData = {} as ICouponsObject;
      jest.spyOn(couponsService, 'calculate').mockImplementation((): ICouponsObject => expectedData);

      const result = await appController.getProductsFromCoupon(fakeCouponsGetDTO);

      expect(result).toBeInstanceOf(CouponsSendDTO);
    });
  });
});
