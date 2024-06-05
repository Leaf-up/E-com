/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RegistrationForm } from '~/widgets/register-form/register-form';

jest.mock('~/api/auth/create', () => jest.fn());
jest.mock('~/widgets/message/message', () => jest.fn());

it('DOM: Register form component', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <RegistrationForm />
    </BrowserRouter>,
  );

  expect(asFragment()).toBeTruthy();
});
