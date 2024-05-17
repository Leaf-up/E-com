/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { DropDown } from '~/shared';

it('DOM: Drop down component', () => {
  const { asFragment } = render(
    <DropDown name="test" placeholder="placeholder" options={['one', 'two']} onClick={() => 1} />,
  );

  expect(asFragment()).toBeTruthy();
});
