import { useState, useEffect } from 'react';
import { runInAction, makeAutoObservable, reaction } from 'mobx';
import type { TProduct, TDiscount } from '~/api/products/types';
import { filter, requestCategory, requestDiscount } from '~/api';

const ProductsStoreSettings = {
  productList: false,
  categoryList: true,
  discountList: false,
};

class ProductsStore {
  private _products: TProduct[] | null = null;
  private _total: number | undefined;
  private _category: Record<string, string> | null = null;
  private _discount: TDiscount[] | null = null;

  constructor() {
    if (ProductsStoreSettings.productList) {
      filter().then((response) => {
        if (response.data) {
          runInAction(() => {
            this._products = response.data;
            this._total = response.total;
          });
        }
      });
    }
    if (ProductsStoreSettings.categoryList) {
      requestCategory().then((response) => {
        if (response.data) {
          runInAction(() => {
            const data = (response.data || []).reduce<Record<string, string>>((acc, item) => {
              acc[item.id] = item.slug['en-US'];
              return acc;
            }, {});
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
  }

  get products() {
    return this._products;
  }

  set total(value: number | undefined) {
    this._total = value;
  }

  get total() {
    return this._total;
  }

  set category(value: Record<string, string> | null) {
    this._category = value;
  }

  get category() {
    return this._category;
  }

  set discount(value: TDiscount[] | null) {
    this._discount = value;
  }

  get discount() {
    return this._discount;
  }
}

export const productsStore = new ProductsStore();

export const useProducts = () => {
  const [products, setProducts] = useState<TProduct[] | null>(productsStore.products);
  const [total, setTotal] = useState<number | undefined>(productsStore.total);
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
      () => productsStore.total,
      (value) => {
        setTotal(value);
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

  return { products, total, category, discount };
};
