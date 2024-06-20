/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Product from '~/pages/product/product';

jest.mock('~/pages', () => ({
  ...jest.requireActual('~/pages/404/404'),
}));
jest.mock('~/api', () => ({
  requestProducts: jest.fn(() => Promise.resolve({})),
  requestCategory: jest.fn(() => Promise.resolve({})),
}));

it('DOM: product page:', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <Product />
    </BrowserRouter>,
  );

  expect(asFragment()).toBeTruthy();
});
