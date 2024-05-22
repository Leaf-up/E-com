import { getSystemTheme } from '~/utils';

describe('System info utils:', () => {
  test('System theme', () => {
    expect(getSystemTheme()).toBe('light'); // Expected light cause no window object defined
  });
});
