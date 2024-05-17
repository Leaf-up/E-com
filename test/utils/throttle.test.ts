import { throttle, debounce } from '~/utils';

describe('Throttle utils:', () => {
  test('Throttle', () => {
    const callback = jest.fn(() => 'mock content');
    const throttled = throttle(callback, 1);
    throttled(1, 2, 3);
    throttled(4);
    throttled('hey!');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(expect(callback).toHaveBeenCalledTimes(1));
      }, 100);
    });
  });

  test('Debounce', () => {
    const callback = jest.fn(() => 'mock content');
    const debounced = debounce(callback, 1);
    debounced(1);
    debounced(2);
    debounced('hey!');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(expect(callback).toHaveBeenCalledTimes(1));
      }, 100);
    });
  });
});
