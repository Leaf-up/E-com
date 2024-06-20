/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { ModalAddressCreate } from '~/pages/profile/address/modal-address-create/modal-address-create';

jest.mock('~/entities/customer/customer', () => ({ useCustomer: jest.fn(() => ({ user: {} })) }));
jest.mock('~/entities/products/products', () => jest.fn());
jest.mock('~/api/profile/updateUser', () => jest.fn());
jest.mock('~/widgets/message/message', () => jest.fn());

it('DOM: address create modal component:', () => {
  const { asFragment } = render(<ModalAddressCreate isOpen closeModal={() => false} type="shipping" />);

  expect(asFragment()).toBeTruthy();
});
