import type { TCustomer } from '~/api/auth/types';
import { makeAutoObservable, reaction } from 'mobx';
import { useState, useEffect } from 'react';

class CustomerStore {
  private _user: TCustomer | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  set user(value: TCustomer | null) {
    console.log('Store: user updated');
    this._user = value;
  }

  get user() {
    return this._user;
  }
}

export const customerStore = new CustomerStore();

export const useCustomer = () => {
  const [user, setUser] = useState<TCustomer | null>(null);

  useEffect(() => {
    reaction(
      () => customerStore.user,
      (value) => {
        setUser(value);
      },
    );

    if (customerStore.user) setUser(customerStore.user);
  }, []);

  return { user };
};
