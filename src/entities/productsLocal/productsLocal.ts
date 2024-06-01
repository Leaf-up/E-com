import { getLocalProducts } from '~/api';
import type { TProduct } from '~/api/products/types';

class ProductsLocal {
  private _products: TProduct[] | null = null;

  get products() {
    return new Promise<TProduct[]>((resolve) => {
      if (this._products) resolve(this._products);
      else {
        getLocalProducts().then((data) => {
          if (data) {
            this._products = data;
            resolve(data);
          }
        });
      }
    });
  }
}

export const productsLocal = new ProductsLocal();
