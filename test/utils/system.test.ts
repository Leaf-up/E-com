import { getSystemTheme } from '~/utils';

describe('System info utils:', () => {
  test('System theme', () => {
    expect(getSystemTheme()).toBe('light');
  });
});
