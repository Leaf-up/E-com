import { useState, useEffect } from 'react';
import { makeAutoObservable, reaction } from 'mobx';
import type { TCustomer } from '~/api/types';
import type { TCart } from '~/api/cart/types';
import requestCart from '~/api/cart/get';
import { changeCart } from '~/api';
import { getSystemTheme } from '~/utils';
import store from '~/utils/store';

type TTheme = 'light' | 'dark';
type TCartStore = { id: string; version: number };

class CustomerStore {
  private _user: TCustomer | null = null;
  private _cart: TCart | (TCartStore & Partial<TCart>) | null = null;
  private _theme: TTheme;

  constructor() {
    const user = store.get<TCustomer>('user');
    if (user) this._user = user;

    const cart = store.get<TCartStore>('cart');
    if (this._user) requestCart('', this._user?.id);
    else if (cart) requestCart(cart.id);

    const theme = store.get<TTheme>('theme');
    this._theme = theme ?? getSystemTheme();

    makeAutoObservable(this);
  }

  set user(value: TCustomer | null) {
    if (!this._user && value) requestCart('', value.id);
    this._user = value;
    store.set('user', this._user);

    if (this._user && this._cart) {
      if (!this._cart.customerId) {
        changeCart(this._cart.id, this._cart.version, [{ action: 'setCustomerId', customerId: this._user.id }]);
      }
    }
  }

  get user() {
    return this._user;
  }

  set cart(value: TCart | null) {
    this._cart = value;
    if (value) {
      store.set('cart', { id: value.id, version: value.version });
    } else {
      store.set('cart', null);
    }
  }

  get cart() {
    return this._cart ? (this._cart as TCart) : null;
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
