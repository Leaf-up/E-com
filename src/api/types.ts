export type TToken = {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  scope: string;
};

export type TAddress = {
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

export type TFilterData = {
  priceMin: number;
  priceMax: number;
  brand: string | null;
  weightMin: number;
  weightMax: number;
  color: string | null;
  size: string | null;
  charm: boolean | null;
};
