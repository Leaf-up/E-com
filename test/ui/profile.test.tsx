/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Profile } from '~/pages/profile/profile';

jest.mock('~/api', () => jest.fn());
jest.mock('~/entities/customer/customer', () => ({
  useCustomer: jest.fn(() => ({ user: {} })),
  customerStore: {},
}));
jest.mock('~/entities/products/products', () => jest.fn());
jest.mock('~/api/profile/updateUser', () => jest.fn());
jest.mock('~/api/profile/changePassword', () => jest.fn());
jest.mock('~/widgets/message/message', () => jest.fn());

it('DOM: profile page:', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <Profile />
    </BrowserRouter>,
  );

  expect(asFragment()).toBeTruthy();
});
