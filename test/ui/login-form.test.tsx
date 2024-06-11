/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FormError from '~/ui/form/error/form-error';
import ButtonSubmit from '~/ui/form/submit/button-submit';
import { LoginForm } from '~/widgets/login-form/login-form';

jest.mock('~/api', () => jest.fn());
jest.mock('~/api/auth/login', () => jest.fn());
jest.mock('~/widgets/message/message', () => jest.fn());
jest.mock('~/ui', () => ({
  ...jest.requireActual('~/ui/form/input-email/input-email'),
  ...jest.requireActual('~/ui/form/input-password/input-password'),
  ...jest.requireActual('~/ui/form/form-link/form-link'),
  ButtonSubmit,
  FormError,
}));

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
