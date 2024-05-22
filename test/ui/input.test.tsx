/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { Input } from '~/shared/input/input';

it('DOM: Input component', () => {
  const { asFragment } = render(<Input name="test" placeholder="placeholder" />);
  expect(asFragment()).toBeTruthy();
});
