import { useState, useEffect } from 'react';
import { runInAction, makeAutoObservable, reaction } from 'mobx';
import type { TProduct, TCategory, TDiscount } from '~/api/products/types';
import { requestProducts, requestCategoty, requestDiscount } from '~/api';

class ProductsStore {
  private _products: TProduct[] | null = null;
  private _category: TCategory[] | null = null;
  private _discount: TDiscount[] | null = null;

  constructor() {
    requestProducts().then((response) => {
      if (response.data) {
        runInAction(() => {
          this._products = response.data;
        });
      }
    });
    requestCategoty().then((response) => {
      if (response.data) {
        runInAction(() => {
          this._category = response.data;
        });
      }
    });
    requestDiscount().then((response) => {
      if (response.data) {
        runInAction(() => {
          this._discount = response.data;
        });
      }
    });

    makeAutoObservable(this);
  }

  set products(value: TProduct[] | null) {
    this._products = value;
    console.log('Products update:', value);
  }

  get products() {
    return this._products;
  }

  set category(value: TCategory[] | null) {
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
  const [category, setCategory] = useState<TCategory[] | null>(productsStore.category);
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
