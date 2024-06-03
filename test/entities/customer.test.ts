import { customerStore } from '~/entities/customer/customer';
import type { TCustomer } from '~/api/types.ts';

jest.mock('~/widgets/message/message', () => jest.fn());
jest.mock('mobx', () => ({
  makeAutoObservable: jest.fn(() => undefined),
  reaction: jest.fn(() => undefined),
}));
jest.mock('~/utils/store', () => ({
  get: jest.fn(() => undefined),
  set: jest.fn(() => undefined),
}));

const user: TCustomer = {
  id: 'userid',
  version: 1,
  email: 'email@email.email',
  password: 'password',
  firstName: 'firstName',
  lastName: 'lastName',
  dateOfBirth: 'dateOfBirth',
  addresses: [
    {
      id: 'addressesid',
      streetName: 'streetName',
      city: 'city',
      postalCode: 'postalCode',
      country: 'country',
    },
  ],
  shippingAddressIds: ['addressesid'],
  billingAddressIds: ['addressesid'],
  defaultShippingAddressId: 'addressesid',
  defaultBillingAddressId: 'addressesid',
};
const theme = 'light';

describe('CustomerStore:', () => {
  test('User', () => {
    customerStore.user = user;
    expect(customerStore.user).toBe(user);
  });

  test('Theme', () => {
    customerStore.theme = theme;
    expect(customerStore.theme).toBe(theme);
  });
});
