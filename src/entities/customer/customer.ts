import { useState, useEffect } from 'react';
import { makeAutoObservable, reaction } from 'mobx';
import type { TCustomer } from '~/api/types';
import type { TCart } from '~/api/cart/types';
import { getSystemTheme } from '~/utils';
import store from '~/utils/store';

type TTheme = 'light' | 'dark';

class CustomerStore {
  private _user: TCustomer | null = null;
  private _cart: TCart | null = null;
  private _theme: TTheme;

  constructor() {
    const user = store.get<TCustomer>('user');
    if (user) this._user = user;
    const cart = store.get<TCart>('cart');
    if (cart) this._cart = cart;
    const theme = store.get<TTheme>('theme');
    this._theme = theme ?? getSystemTheme();

    makeAutoObservable(this);
  }

  set user(value: TCustomer | null) {
    this._user = value;
    store.set('user', this._user);
  }

  get user() {
    return this._user;
  }

  set cart(value: TCart | null) {
    this._cart = value;
    store.set('cart', this._cart);
  }

  get cart() {
    return this._cart;
  }

  set theme(value: TTheme) {
    this._theme = value;
    store.set('theme', this._theme);
  }

  get theme() {
    return this._theme;
  }
}

export const customerStore = new CustomerStore();

export function useCustomer() {
  const [user, setUser] = useState<TCustomer | null>(customerStore.user);
  const [cart, setCart] = useState<TCart | null>(customerStore.cart);
  const [theme, setTheme] = useState<TTheme>(customerStore.theme);

  const logout = () => {
    customerStore.user = null;
  };

  useEffect(() => {
    reaction(
      () => customerStore.user,
      (value) => {
        setUser(value);
      },
    );
    reaction(
      () => customerStore.cart,
      (value) => {
        setCart(value);
      },
    );
    reaction(
      () => customerStore.theme,
      (value) => {
        setTheme(value);
      },
    );
  }, []);

  return { user, logout, cart, theme };
}
