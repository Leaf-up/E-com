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
  | 'setDefaultBillingAddress';

export type TProfileAction = {
  action: TProfileActionName;
  addressId?: string; // Address remove | change | setDefault
  address?: TAddress; // addAddress | changeAddress
  email?: string; // changeEmail
  firstName?: string; // setFirstName
  lastName?: string; // setLastName
  dateOfBirth?: string; // setDateOfBirth
};
