/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FormError from '~/ui/form/error/form-error';
import ButtonSubmit from '~/ui/form/submit/button-submit';
import { Register } from '~/pages/register/register';

jest.mock('~/api/auth/create', () => jest.fn());
jest.mock('~/widgets/message/message', () => jest.fn());
jest.mock('~/widgets', () => ({
  ...jest.requireActual('~/widgets/register-form/register-form'),
}));
jest.mock('~/ui', () => ({
  ...jest.requireActual('~/ui/form/input-date/input-date'),
  ...jest.requireActual('~/ui/form/input-email/input-email'),
  ...jest.requireActual('~/ui/form/input-password/input-password'),
  ...jest.requireActual('~/ui/form/input-text/input-text'),
  ...jest.requireActual('~/ui/form/form-link/form-link'),
  ...jest.requireActual('~/ui/form/address/address'),
  ButtonSubmit,
  FormError,
}));

it('DOM: register page:', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>,
  );

  expect(asFragment()).toBeTruthy();
});
