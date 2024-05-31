import { useState, useEffect } from 'react';
import { runInAction, makeAutoObservable, reaction } from 'mobx';
import type { TProduct, TDiscount } from '~/api/products/types';
import { search, requestCategoty, requestDiscount } from '~/api';

const ProductsStoreSettings = {
  produstList: true,
  categoryList: true,
  discountList: false,
};

class ProductsStore {
  private _products: TProduct[] | null = null;
  private _category: Record<string, string> | null = null;
  private _discount: TDiscount[] | null = null;

  constructor() {
    if (ProductsStoreSettings.produstList) {
      search().then((response) => {
        if (response.data) {
          // console.log(response.data);
          runInAction(() => {
            this._products = response.data;
          });
        }
      });
    }
    if (ProductsStoreSettings.categoryList) {
      requestCategoty().then((response) => {
        if (response.data) {
          runInAction(() => {
            const data = (response.data || []).reduce<Record<string, string>>((acc, item) => {
              acc[item.id] = item.slug['en-US'];
              return acc;
            }, {});
            // console.log(data);
            this._category = data;
          });
        }
      });
    }
    if (ProductsStoreSettings.discountList) {
      requestDiscount().then((response) => {
        if (response.data) {
          runInAction(() => {
            this._discount = response.data;
          });
        }
      });
    }
    makeAutoObservable(this);
  }

  set products(value: TProduct[] | null) {
    this._products = value;
    console.log('Products update:', value);
  }

  get products() {
    return this._products;
  }

  set category(value: Record<string, string> | null) {
    this._category = value;
    console.log('Category update:', value);
  }

  get category() {
    return this._category;
  }

  set discount(value: TDiscount[] | null) {
    this._discount = value;
    console.log('Discount update:', value);
  }

  get discount() {
    return this._discount;
  }
}

export const productsStore = new ProductsStore();

export const useProducts = () => {
  const [products, setProducts] = useState<TProduct[] | null>(productsStore.products);
  const [category, setCategory] = useState<Record<string, string> | null>(productsStore.category);
  const [discount, setDiscount] = useState<TDiscount[] | null>(productsStore.discount);

  useEffect(() => {
    reaction(
      () => productsStore.products,
      (value) => {
        setProducts(value);
      },
    );
    reaction(
      () => productsStore.category,
      (value) => {
        setCategory(value);
      },
    );
    reaction(
      () => productsStore.discount,
      (value) => {
        setDiscount(value);
      },
    );
  }, []);

  return { products, category, discount };
};
