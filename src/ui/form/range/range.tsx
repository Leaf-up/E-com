import { useState, useRef } from 'react';
import RangeProps from './types';

import styles from './range.module.css';

export default function Range({ name = 'input', title, min, max, step = 1 }: RangeProps) {
  const rangeRef = useRef<HTMLDivElement>(null);
  const valueMinRef = useRef<HTMLElement>(null);
  const valueMaxRef = useRef<HTMLElement>(null);
  const inputMinRef = useRef<HTMLInputElement>(null);
  const inputMaxRef = useRef<HTMLInputElement>(null);
  const [range, setRange] = useState({ min, max });

  const rangeHandler = (side: 'min' | 'max', value: string) => {
    let minVal = side === 'min' ? Number(value) : range.min;
    let maxVal = side === 'max' ? Number(value) : range.max;
    if (maxVal - minVal < step) {
      if (side === 'min') {
        minVal = maxVal - step;
      } else {
        maxVal = minVal + step;
      }
    } else {
      if (valueMinRef.current && valueMaxRef.current) {
        valueMinRef.current.textContent = minVal.toString();
        valueMaxRef.current.textContent = maxVal.toString();
      }
      if (rangeRef.current) {
        rangeRef.current.style.left = `${((minVal - min) / (max - min)) * 100}%`;
        rangeRef.current.style.right = `${100 - ((maxVal - min) / (max - min)) * 100}%`;
      }
    }
    if (inputMinRef.current) inputMinRef.current.value = minVal.toString();
    if (inputMaxRef.current) inputMaxRef.current.value = maxVal.toString();
    setRange({ min: minVal, max: maxVal });
  };

  return (
    <div className={styles.range}>
      {title && <div className={styles.range__title}>{title}</div>}
      <div className={styles.range__track}>
        <div ref={rangeRef} className={styles.range__track_progress} />
      </div>
      <div className={styles.range__input}>
        <input
          ref={inputMinRef}
          name={`${name}-min`}
          type="range"
          min={min}
          max={max}
          defaultValue={min}
          step={step}
          onChange={(e) => rangeHandler('min', e.currentTarget.value)}
        />
        <input
          ref={inputMaxRef}
          name={`${name}-max`}
          type="range"
          min={min}
          max={max}
          defaultValue={max}
          step={step}
          onChange={(e) => rangeHandler('max', e.currentTarget.value)}
        />
      </div>
      <div className={styles.range__value}>
        <span ref={valueMinRef}>{min}</span>
        <span ref={valueMaxRef}>{max}</span>
      </div>
    </div>
  );
}
