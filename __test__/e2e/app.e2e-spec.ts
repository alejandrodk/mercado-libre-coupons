import { fakeProductsDatabase } from './../mocks/db.mock';
import { AppController } from './../../src/application/controllers/app.controller';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepository } from '../../src/infrastructure/repositories/products.repository';
import { CouponsService, ProductsService } from '../../src/domain/services';
import { ConfigService } from '@nestjs/config';
import request from 'supertest';
import { fakeRequestBody, RequestBodyCouponFail, RequestBodyItemFail } from '../mocks';

describe('Test app endpoints', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const mockRepository = {
      getProductPrice: jest.fn((itemId: string) => fakeProductsDatabase.find(product => product.id === itemId)),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AppController],
      providers: [
        {
          provide: ProductRepository,
          useValue: mockRepository,
        },
        ProductsService,
        CouponsService,
        ConfigService,
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('Check app status', () => {
    it('Should be defined', () => {
      expect(app).toBeDefined();
    });
  });

  describe('Test coupons endpoint', () => {
    it('Should received status code 200 with correct request body', async () => {
      return request(app.getHttpServer()).post('/coupon').send(fakeRequestBody).expect(HttpStatus.OK);
    });

    it('Should received status code 400 with invalid request body', async () => {
      return request(app.getHttpServer()).post('/coupon').send({}).expect(HttpStatus.BAD_REQUEST);
    });

    it('Should received status code 404 if the coupon amount is too low', async () => {
      return request(app.getHttpServer()).post('/coupon').send(RequestBodyCouponFail).expect(HttpStatus.NOT_FOUND);
    });

    it('Should received status code 400 if any item not pass the schema validation', async () => {
      return request(app.getHttpServer()).post('/coupon').send(RequestBodyItemFail).expect(HttpStatus.BAD_REQUEST);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
