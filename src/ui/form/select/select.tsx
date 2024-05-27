import { useState } from 'react';
import type SelectProps from './types';

import styles from './.module.css';

export default function Select({ name, options, value, onChange, isReadonly }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);

  return (
    <div className={`${styles.dropdown} ${name ? styles.dropdown_l : styles.dropdown_m}`}>
      <div
        className={styles.dropdown__current}
        onClick={() => {
          if (!isReadonly) setOpen(!open);
        }}
      >
        <div>
          {name && <div className={styles.dropdown__title}>{name}</div>}
          <div>{options[selected]}</div>
        </div>
        <svg
          className={open ? styles.icon_rotated : ''}
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 13.1722L16.95 8.22217L18.364 9.63617L12 16.0002L5.63599 9.63617L7.04999 8.22217L12 13.1722Z"
            fill="#888"
          />
        </svg>
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
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
