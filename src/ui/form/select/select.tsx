import { useState } from 'react';
import type SelectProps from './types';

import styles from './.module.css';

export default function Select({ name, options, value, onChange, isReadonly }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);

  return (
    <div className={`${styles.dropdown} ${name ? styles.dropdown_l : styles.dropdown_m}`}>
      <div
        className={styles.dropdown__control}
        onClick={() => {
          if (!isReadonly) setOpen(!open);
        }}
        aria-hidden="true"
        aria-label={open ? 'open' : 'closed'}
      >
        <div>
          {name && <div className={styles.dropdown__title}>{name}</div>}
          <div>{options[selected]}</div>
        </div>
      </div>
      <ul className={open ? `${styles.options} ${styles.options_show}` : styles.options}>
        {options.map((option, i) => (
          <li
            className={
              i === selected ? `${styles.options__item} ${styles.options__item_selected}` : styles.options__item
            }
            key={i}
            onClick={() => {
              if (!isReadonly) {
                setSelected(i);
                setOpen(!open);
                if (onChange) onChange(i);
              }
            }}
            aria-hidden="true"
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
