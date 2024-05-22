import { TAddress } from '../types';

export type TProfileActionName =
  | 'removeAddress'
  | 'addAddress'
  | 'changeAddress'
  | 'setDefaultShippingAddress'
  | 'setDefaultBillingAddress';

export type TProfileAction = {
  action: TProfileActionName;
  addressId?: string;
  address?: TAddress;
};
