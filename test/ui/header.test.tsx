/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '~/widgets';

it('DOM: Header component', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>,
  );

  expect(asFragment()).toBeTruthy();
});
