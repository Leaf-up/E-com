/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { PasswordForm } from '~/pages/profile/password-form/password-form';

jest.mock('~/entities/customer/customer', () => ({ useCustomer: () => ({ user: null }) }));
jest.mock('~/entities/products/products', () => jest.fn());
jest.mock('~/api/profile/changePassword', () => jest.fn());
jest.mock('~/widgets/message/message', () => jest.fn());

it('DOM: password form component:', () => {
  const { asFragment } = render(<PasswordForm disableEditMode={() => false} />);

  expect(asFragment()).toBeTruthy();
});
