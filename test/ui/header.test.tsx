/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '~/widgets/header/header';

jest.mock('~/entities/customer/customer', () => ({ useCustomer: () => ({ user: null, logout: () => undefined }) }));

it('DOM: Header component', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>,
  );

  expect(asFragment()).toBeTruthy();
});
