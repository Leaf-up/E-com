import { useRef, useState } from 'react';
import arrowIcon from '/icons/arrow.svg';
import { Input } from '~/shared';
import type DropDownProps from './types';
import styles from './dropdown.module.css';

export function Dropdown({ label, id, name, placeholder, options, errorMessage, onClick, isReadonly }: DropDownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<boolean | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.dropdown}>
      <Input
        label={label}
        id={id}
        name={name}
        placeholder={placeholder}
        ref={ref}
        readonly
        errorMessage={selected !== null ? errorMessage : null}
        onClick={() => {
          if (isReadonly) return;

          setOpen(!open);
          const value = ref.current?.value ?? '';
          open && setSelected(value.length > 0);
          onClick(value);
        }}
        inputIcon={
          <div className={styles.icon__container}>
            <img className={open ? `${styles.icon} ${styles.icon_rotated}` : styles.icon} src={arrowIcon} alt="arrow" />
          </div>
        }
      />
      <div className={open ? `${styles.options} ${styles.options_show}` : styles.options}>
        {options.map((option) => (
          <button
            className={styles.options__item}
            type="button"
            key={option}
            onClick={() => {
              if (isReadonly) return;

              if (ref.current) {
                ref.current.value = option;
              }
              setOpen(!open);
              onClick(option);
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
