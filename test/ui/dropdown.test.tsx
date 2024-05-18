/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { Dropdown } from '~/shared';

it('DOM: Drop down component', () => {
  const { asFragment } = render(
    <Dropdown name="test" placeholder="placeholder" options={['one', 'two']} onClick={() => 1} />,
  );

  expect(asFragment()).toBeTruthy();
});
