import { Injectable } from '@nestjs/common';
import { getCheappestProductValue } from '../helpers';

@Injectable()
export class CouponsService {
  //List<String> calculate(Map<String, Float> items, Float amount)
  calculate(items: Record<string, number>, couponAmount: number): any {
    const itemsKeys = Object.keys(items);
    const itemsValues = Object.values(items);
    const itemsQuantity = itemsKeys.length;

    const cheappestProduct = getCheappestProductValue(items);

    const getTotalFromProducts = (coupon: number, values: number[], totalProducts: number): any => {
      const currentValue = values[totalProducts - 1];

      if (!totalProducts || coupon < cheappestProduct) return 0;

      if (currentValue > coupon) return getTotalFromProducts(coupon, values, totalProducts - 1);

      const totalWithProduct = currentValue + getTotalFromProducts(coupon - currentValue, values, totalProducts - 1);
      const totalWithoutProduct = getTotalFromProducts(coupon, values, totalProducts - 1);
      return Math.max(totalWithProduct, totalWithoutProduct);
    };

    return {
      items_ids: [],
      total: getTotalFromProducts(couponAmount, itemsValues, itemsQuantity),
    };
  }
}
