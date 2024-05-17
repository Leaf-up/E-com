/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RegistrationForm } from '~/widgets';

it('DOM: Login form component', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <RegistrationForm />
    </BrowserRouter>,
  );

  expect(asFragment()).toBeTruthy();
});
