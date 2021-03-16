import { random } from 'faker';
import { removeCurrentProduct, removeExpensiveProducts } from '../../src/domain/helpers';

describe('Test coupons helpers functions', () => {
  describe('[removeExpensiveItems', () => {
    it('Should remove item if its price is higher than the coupon', () => {
      const obj = {
        prop1: 100,
        prop2: 200,
        prop3: 300,
      };
      const result = removeExpensiveProducts(obj, 200);

      expect(result).not.toHaveProperty('prop3');
    });
  });

  describe('[removeCurrentProduct]', () => {
    it('Should remove the last property of an object', () => {
      const obj = {
        prop1: random.number(),
        prop2: random.number(),
      };

      const result = removeCurrentProduct(obj);

      expect(result).not.toHaveProperty('prop2');
    });
  });
});
