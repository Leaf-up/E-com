import { useState, useEffect } from 'react';
import { makeAutoObservable, reaction } from 'mobx';
import type { TCustomer } from '~/api/auth/types';
import store from '~/utils/store';

class CustomerStore {
  private _user: TCustomer | null = null;

  constructor() {
    const user = store.get<TCustomer>('user');
    if (user) this._user = user;

    makeAutoObservable(this);
  }

  set user(value: TCustomer | null) {
    this._user = value;
    store.set('user', this._user);
  }

  get user() {
    return this._user;
  }
}

export const customerStore = new CustomerStore();

export const useCustomer = () => {
  const [user, setUser] = useState<TCustomer | null>(customerStore.user);

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
  }, []);

  return { user, logout };
};
