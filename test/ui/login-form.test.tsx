/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LoginForm } from '~/widgets/login-form/login-form';

jest.mock('~/api/auth/login', () => jest.fn());
jest.mock('~/widgets/message/message', () => jest.fn());

describe('DOM: Login form component:', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
  );
  test('Receive expected user data', async () => {
    expect(asFragment()).toBeTruthy();
  });
});
