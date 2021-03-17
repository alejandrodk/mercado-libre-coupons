/* eslint-disable prettier/prettier */
import { getCheappestProductValue, removeExpensiveProducts } from '../../src/domain/helpers';

describe('Test coupons helpers functions', () => {
  let fakeObject: Record<string, number>;

  beforeEach(() => {
    fakeObject = {
      prop1: 100,
      prop2: 200,
      prop3: 300,
    };
  });

  describe('[removeExpensiveItems]', () => {
    it('Should remove item if its price is higher than the coupon', () => {
      const result = removeExpensiveProducts(fakeObject, 200);

      expect(result).not.toHaveProperty('prop3');
    });
  });

  describe('[getCheappestProductValue]', () => {
    it('Should return the value of the cheappest product', () => {
      const result = getCheappestProductValue(fakeObject);

      expect(result).toBe(100);
    });
  });
});
