import { TAddress } from '../types';

export type TProfileActionName =
  | 'changeEmail'
  | 'setFirstName'
  | 'setLastName'
  | 'setDateOfBirth'
  | 'removeAddress'
  | 'addAddress'
  | 'changeAddress'
  | 'setDefaultShippingAddress'
  | 'setDefaultBillingAddress'
  | 'addShippingAddressId'
  | 'addBillingAddressId';

export type TProfileAction = {
  action: TProfileActionName;
  addressId?: string;
  address?: TAddress;
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
};
