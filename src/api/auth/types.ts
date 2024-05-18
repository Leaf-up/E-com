export type TToken = {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  scope: string;
};

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

type TAddress = {
  id?: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
};

export type TCustomer = {
  id: string;
  version: number;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: TAddress[];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
};
