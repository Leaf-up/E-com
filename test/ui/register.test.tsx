/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Register } from '~/pages/register/register';

jest.mock('~/api/auth/create', () => jest.fn());
jest.mock('~/widgets/message/message', () => jest.fn());
jest.mock('~/widgets', () => ({
  ...jest.requireActual('~/widgets/register-form/register-form'),
}));

it('DOM: register page:', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>,
  );

  expect(asFragment()).toBeTruthy();
});
