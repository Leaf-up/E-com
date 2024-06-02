import { useEffect, useRef, useState } from 'react';
import type SelectProps from './types';

import styles from './.module.css';

export default function Select({ title, name, options, value = 0, onChange, isReadonly }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const controlClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!isReadonly) setOpen((prev) => !prev);
  };

  const optionsSelectHandler = (i: number) => {
    if (!isReadonly) {
      setSelected(i);
      setOpen(false);
      if (inputRef.current) inputRef.current.value = options[i];
      if (onChange) onChange(i);
    }
  };

  const getOptionclassName = (i: number) => {
    return i === selected ? `${styles.options__item} ${styles.options__item_selected}` : styles.options__item;
  };

  useEffect(() => {
    const setClosed = () => setOpen(false);
    document.body.addEventListener('click', setClosed);
    return () => document.body.removeEventListener('click', setClosed);
  }, []);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = options[value];
  }, [value]);

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
            ref={inputRef}
            className={styles.dropdown__input}
            name={name}
            defaultValue={options[0]}
            tabIndex={-1}
            onInput={(e) => setSelected(options.indexOf(e.currentTarget.value))}
          />
        </div>
      </div>
      <ul className={open ? `${styles.options} ${styles.options_show}` : styles.options}>
        {options.map((option, i) => (
          <li className={getOptionclassName(i)} key={i} onClick={() => optionsSelectHandler(i)} aria-hidden="true">
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
