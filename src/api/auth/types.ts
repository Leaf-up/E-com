import type { TAddress } from '~/api/types';

export type TCredentials = {
  email: string;
  password: string;
};

export type TRegisterData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
  addresses: TAddress[];
  shippingAddresses: number[];
  billingAddresses: number[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
};
