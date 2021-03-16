import { Injectable } from '@nestjs/common';

@Injectable()
export class CouponsService {
  //List<String> calculate(Map<String, Float> items, Float amount)
  calculate(items: Record<string, number>, couponAmount: number): any {
    const itemsKeys = Object.keys(items);
    const itemsValues = Object.values(items);
    const itemsQuantity = itemsKeys.length;

    const getTotalFromProducts = (coupon: number, values: number[], quantity: number): any => {
      const lastItemValue = values[quantity - 1];

      if (!quantity || !coupon) return 0;

      if (lastItemValue > coupon) return getTotalFromProducts(coupon, values, quantity - 1);

      const totalWithProduct = lastItemValue + getTotalFromProducts(coupon - lastItemValue, values, quantity - 1);
      const totalWithoutProduct = getTotalFromProducts(coupon, values, quantity - 1);

      return Math.max(totalWithProduct, totalWithoutProduct);
    };

    return getTotalFromProducts(couponAmount, itemsValues, itemsQuantity);
  }
}
