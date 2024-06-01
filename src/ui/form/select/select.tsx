import { useEffect, useState } from 'react';
import type SelectProps from './types';

import styles from './.module.css';

export default function Select({ title, name, options, value = 0, onChange, isReadonly }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    const setClosed = () => setOpen(false);
    document.body.addEventListener('click', setClosed);
    return () => document.body.removeEventListener('click', setClosed);
  }, []);

  const controlClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!isReadonly) setOpen(!open);
  };

  return (
    <div className={`${styles.dropdown} ${title ? styles.dropdown_l : styles.dropdown_m}`}>
      <div
        className={styles.dropdown__control}
        onClick={controlClickHandler}
        aria-hidden="true"
        aria-label={open ? 'open' : 'closed'}
      >
        <div>
          {title && <div className={styles.dropdown__title}>{title}</div>}
          <input
            className={styles.dropdown__input}
            name={name}
            value={options[selected]}
            onChange={() => undefined}
            tabIndex={-1}
          />
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
