/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Page404 from '~/pages/404/404.tsx';

it('DOM: Page404', () => {
  const { queryAllByText } = render(
    <BrowserRouter>
      <Page404 />
    </BrowserRouter>,
  );
  expect(queryAllByText(/Page not found/i)).toBeTruthy();
});
