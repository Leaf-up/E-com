/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Login } from '~/pages/login/login';

jest.mock('~/api/auth/login', () => jest.fn());
jest.mock('~/widgets/message/message', () => jest.fn());
jest.mock('~/widgets', () => ({
  ...jest.requireActual('~/widgets/login-form/login-form'),
}));

it('DOM: login page:', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );

  expect(asFragment()).toBeTruthy();
});
