import { useState } from 'react';
import { Input } from '~/shared';
import DropDownProps from './types';
import arrowIcon from '../../assets/icons/arrow.svg';
import styles from './drop-down.module.css';

export function DropDown({ label, id, name, placeholder, options, errorMessage, value, setValue }: DropDownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<boolean | null>(null);

  return (
    <div className={styles.dropDown}>
      <Input
        label={label}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        readonly
        errorMessage={selected !== null ? errorMessage : null}
        onClick={() => {
          setOpen(!open);
          open && setSelected(value.length > 0);
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
              setValue(option);
              setOpen(!open);
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
