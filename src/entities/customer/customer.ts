import { useState, useEffect } from 'react';
import { autorun, makeAutoObservable, reaction } from 'mobx';
import type { TCustomer } from '~/api/auth/types';

const STORAGE_KEY = 'customer';

class CustomerStore {
  private _user: TCustomer | null = null;

  constructor() {
    makeAutoObservable(this);

    const customer = localStorage.getItem(STORAGE_KEY);

    if (customer) this._user = JSON.parse(customer);

    autorun(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._user));
    });
  }

  set user(value: TCustomer | null) {
    this._user = value;
  }

  get user() {
    return this._user;
  }
}

export const customerStore = new CustomerStore();

export const useCustomer = () => {
  const [user, setUser] = useState<TCustomer | null>(customerStore.user);

  useEffect(() => {
    reaction(
      () => customerStore.user,
      (value) => {
        setUser(value);
      },
    );
  }, []);

  return { user };
};
