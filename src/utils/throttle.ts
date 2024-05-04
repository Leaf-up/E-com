type TFunc = (...args: unknown[]) => void;

export function throttle(func: TFunc, delay = 1000) {
  let timerFlag = 0;

  return (...args: unknown[]) => {
    if (timerFlag === 0) {
      func(...args);
      timerFlag = window.setTimeout(() => {
        timerFlag = 0;
      }, delay);
    }
  };
}

export function debounce(func: TFunc, delay = 1000) {
  let timer = 0;

  return (...args: unknown[]) => {
    clearTimeout(timer);

    timer = window.setTimeout(() => {
      func(...args);
    }, delay);
  };
}
