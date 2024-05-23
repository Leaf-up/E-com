import { useState, useEffect } from 'react';
import { makeAutoObservable, reaction } from 'mobx';
import type { TCustomer } from '~/api/types';
import store from '~/utils/store';
import { message } from '~/widgets';

class CustomerStore {
  private _user: TCustomer | null = null;

  constructor() {
    const user = store.get<TCustomer>('user');
    if (user) {
      this._user = user;
      const { firstName, lastName } = user;
      message.show(`Successfully logged in as ${firstName} ${lastName}`);
    }

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
