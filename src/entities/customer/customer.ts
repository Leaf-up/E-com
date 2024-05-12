import { useState, useEffect } from 'react';
import { makeAutoObservable, reaction } from 'mobx';
import type { TCustomer } from '~/api/auth/types';

class CustomerStore {
  private _user: TCustomer | null = null;

  constructor() {
    makeAutoObservable(this);
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
