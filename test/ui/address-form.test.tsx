/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { performProfileUpdate } from '~/api';
import { TAddress } from '~/api/types';
import { Form } from '~/pages/profile/address/form/form';

jest.mock('~/entities/customer/customer', () => ({ useCustomer: jest.fn(() => ({ user: {} })) }));
jest.mock('~/entities/products/products', () => jest.fn());
jest.mock('~/api/profile/updateUser', () => jest.fn());
jest.mock('~/widgets/message/message', () => jest.fn());

const address = {
  id: '1',
  streetName: 'Any Street',
  postalCode: '11111',
  city: 'Any City',
  country: 'US',
};

const user = {
  id: '1',
  version: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@gmail.com',
  dateOfBirth: '09-09-1990',
  addresses: [address],
  shippingAddressIds: ['1'],
  billingAddressIds: ['1'],
};

const sendRequest = async (data: TAddress): Promise<void> => {
  const response = await performProfileUpdate(user, [
    {
      action: 'changeAddress',
      addressId: address?.id,
      address: {
        country: data.country,
        city: data.city,
        streetName: data.streetName,
        postalCode: data.postalCode,
      },
    },
  ]);

  if (response.error) {
    return Promise.reject(response.error);
  }

  return Promise.resolve();
};

const addressType = 'shipping';

it('DOM: address form component:', () => {
  const { asFragment } = render(
    <Form sendRequest={sendRequest} onCancelButtonClick={() => false} address={address} type={addressType} />,
  );

  expect(asFragment()).toBeTruthy();
});
