import { useState, useRef } from 'react';
import RangeProps from './types';

import styles from './range.module.css';

export default function Range({ name = 'input', title, min, max, step = 1 }: RangeProps) {
  const rangeRef = useRef<HTMLDivElement>(null);
  const minRef = useRef<HTMLElement>(null);
  const maxRef = useRef<HTMLElement>(null);
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
      if (minRef.current && maxRef.current) {
        minRef.current.textContent = minVal.toString();
        maxRef.current.textContent = maxVal.toString();
      }
      if (rangeRef.current) {
        rangeRef.current.style.left = `${((minVal - min) / (max - min)) * 100}%`;
        rangeRef.current.style.right = `${100 - ((maxVal - min) / (max - min)) * 100}%`;
      }
    }
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
          name={`${name}-min`}
          type="range"
          min={min}
          max={max}
          value={range.min}
          step={step}
          onChange={(e) => rangeHandler('min', e.currentTarget.value)}
        />
        <input
          name={`${name}-max`}
          type="range"
          min={min}
          max={max}
          value={range.max}
          step={step}
          onChange={(e) => rangeHandler('max', e.currentTarget.value)}
        />
      </div>
      <div className={styles.range__value}>
        <span ref={minRef}>{min}</span>
        <span ref={maxRef}>{max}</span>
      </div>
    </div>
  );
}
