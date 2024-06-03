/**
 * @jest-environment jsdom
 */

import { customerStore } from '~/entities';
import type { TCustomer } from '~/api/types.ts';

jest.mock('~/entities/customer/customer', () => ({
  useCustomer: jest.fn(() => ({ user: {} })),
  customerStore: {},
}));
jest.mock('~/entities/products/products', () => jest.fn());

const userMock: TCustomer = {
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
const themeMock = 'light';

describe('CustomerStore:', () => {
  test('User', () => {
    customerStore.user = userMock;
    expect(customerStore.user).toBe(userMock);
  });

  test('Theme', () => {
    customerStore.theme = themeMock;
    expect(customerStore.theme).toBe(themeMock);
  });
});
