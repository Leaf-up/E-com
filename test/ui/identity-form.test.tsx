/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { IdentityForm } from '~/pages/profile/identity-form/identity-form';

jest.mock('~/entities/customer/customer', () => ({ useCustomer: jest.fn(() => ({ user: {} })) }));
jest.mock('~/entities/products/products', () => jest.fn());
jest.mock('~/api/profile/updateUser', () => jest.fn());
jest.mock('~/widgets/message/message', () => jest.fn());

it('DOM: Identity form component:', () => {
  const { asFragment } = render(<IdentityForm isEdit disableEditMode={() => false} />);

  expect(asFragment()).toBeTruthy();
});
