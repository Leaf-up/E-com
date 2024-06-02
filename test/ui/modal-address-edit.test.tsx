/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { ModalAddressEdit } from '~/pages/profile/address/modal-address-edit/modal-address-edit';

jest.mock('~/entities/customer/customer', () => ({ useCustomer: jest.fn(() => ({ user: {} })) }));
jest.mock('~/entities/products/products', () => jest.fn());
jest.mock('~/api/profile/updateUser', () => jest.fn());
jest.mock('~/widgets/message/message', () => jest.fn());

const address = {
  streetName: 'Any Street',
  postalCode: '11111',
  city: 'Any City',
  country: 'US',
};

it('DOM: address edit modal component:', () => {
  const { asFragment } = render(<ModalAddressEdit isOpen closeModal={() => false} address={address} type="shipping" />);

  expect(asFragment()).toBeTruthy();
});
