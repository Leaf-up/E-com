/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import Slider from '~/widgets/slider/slider';

it('DOM: slider component:', () => {
  const { asFragment } = render(<Slider items={[<div>Test1</div>, <div>Test1</div>]} itemsToShow={2} />);

  expect(asFragment()).toBeTruthy();
});
