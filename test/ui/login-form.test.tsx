/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LoginForm } from '~/widgets';

it('DOM: Login form component', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
  );

  expect(asFragment()).toBeTruthy();
});
