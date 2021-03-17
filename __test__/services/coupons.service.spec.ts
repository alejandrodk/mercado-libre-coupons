import { Test, TestingModule } from '@nestjs/testing';
import { CouponsService } from '../../src/domain/services';

describe('Coupons Service', () => {
  let service: CouponsService;
  let fakeObject: Record<string, number>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CouponsService],
    }).compile();

    service = module.get<CouponsService>(CouponsService);
  });

  describe('Service status', () => {
    it('Should be defined', () => {
      expect(service).toBeDefined();
    });
  });
});
