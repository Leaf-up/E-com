import { useState, useEffect } from 'react';
import { makeAutoObservable, reaction } from 'mobx';
import type { TCustomer } from '~/api/types';
import { getSystemTheme } from '~/utils';
import store from '~/utils/store';
import { message } from '~/widgets';

type TTheme = 'light' | 'dark';

class CustomerStore {
  private _user: TCustomer | null = null;
  private _theme: TTheme;

  constructor() {
    const user = store.get<TCustomer>('user');
    if (user) {
      this._user = user;
      const { firstName, lastName } = user;
      message.show(`Logged in as ${firstName} ${lastName}`);
    }
    const theme = store.get<TTheme>('theme');
    this._theme = theme ?? getSystemTheme();

    makeAutoObservable(this);
  }

  set user(value: TCustomer | null) {
    this._user = value;
    console.log('User update:', value);
    store.set('user', this._user);
  }

  get user() {
    return this._user;
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
      () => customerStore.theme,
      (value) => {
        setTheme(value);
      },
    );
  }, []);

  return { user, logout, theme };
}
