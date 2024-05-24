import { useState, useEffect } from 'react';
import { makeAutoObservable, reaction } from 'mobx';
import type { TProduct } from '~/api/products/types';
import { requestProducts } from '~/api';

class ProductsStore {
  private _products: TProduct[] | null = null;

  constructor() {
    requestProducts().then((response) => {
      if (response.data) {
        this._products = response.data;
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
}

export const productsStore = new ProductsStore();

export const useProducts = () => {
  const [products, setProducts] = useState<TProduct[] | null>(productsStore.products);

  useEffect(() => {
    reaction(
      () => productsStore.products,
      (value) => {
        setProducts(value);
      },
    );
  }, []);

  return { products };
};
