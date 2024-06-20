/**
 * @jest-environment jsdom
 */

import { act } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Catalog from '~/pages/catalog/catalog';

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

it('DOM: catalog page:', async () => {
  const { asFragment } = await act(async () =>
    render(
      <BrowserRouter>
        <Catalog />
      </BrowserRouter>,
    ),
  );

  expect(asFragment()).toBeTruthy();
});
