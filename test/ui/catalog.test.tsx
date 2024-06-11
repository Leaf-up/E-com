/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Catalog from '~/pages/catalog/catalog';

jest.mock('~/api', () => jest.fn());
jest.mock('~/api', () => ({
  filter: jest.fn(() => Promise.resolve({})),
}));
jest.mock('~/widgets/message/message', () => jest.fn());
jest.mock('~/entities', () => ({
  useProducts: jest.fn(() => ({
    products: [],
    category: {},
  })),
}));

it('DOM: catalog page:', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <Catalog />
    </BrowserRouter>,
  );

  expect(asFragment()).toBeTruthy();
});
