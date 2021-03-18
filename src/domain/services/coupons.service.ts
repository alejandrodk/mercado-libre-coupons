import { Injectable } from '@nestjs/common';
import { ICouponsObject, TCouponProduct } from '../interfaces/coupons.interfaces';
import { ProductsService } from './products.service';

@Injectable()
export class CouponsService {
  constructor(private productsService: ProductsService) {}
  //List<String> calculate(Map<String, Float> items, Float amount)
  calculate(items: TCouponProduct, couponAmount: number): ICouponsObject {
    const sortedProducts = this.productsService.sortProductsByPrice(items);

    const totalWithProduct = this.getProductsAvailablesByCouponAmount(sortedProducts, couponAmount);
    const totalWithoutProduct = this.getProductsAvailablesByCouponAmount(sortedProducts.splice(1), couponAmount);

    const total = Math.max(totalWithProduct.total, totalWithoutProduct.total);
    const products = total === totalWithProduct.total ? totalWithProduct.products : totalWithoutProduct.products;

    return {
      products,
      total,
    };
  }

  getProductsAvailablesByCouponAmount(items: [string, number][], coupon: number): ICouponsObject {
    return items.reduce(
      (acc, [itemId, itemValue]) => {
        if (itemValue <= coupon && acc.total + itemValue <= coupon) {
          acc.total += itemValue;
          acc.products.push(itemId);
        }
        return acc;
      },
      {
        products: [],
        total: 0,
      } as ICouponsObject
    );
  }
}
