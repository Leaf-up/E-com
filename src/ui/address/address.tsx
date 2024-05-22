import { DropdownCountry } from '../dropdown-country/dropdown-country';
import { InputPostalCode } from '../input-postal-code/input-postal-code';
import { InputStreet } from '../input-street/input-street';
import { InputCity } from '../input-city/input-city';
import type AddressProps from './types';
import styles from './address.module.css';

export function Address({
  title,
  setCityValid,
  setCountryValid,
  setPostalCodeValid,
  setStreetValid,
  radioLabel,
  value,
  defaultChecked,
  type,
  isReadonly,
  isHidden,
}: AddressProps) {
  return (
    <div className={styles.address} aria-hidden={isHidden ?? false}>
      <h3 className={styles.address__title}>{title}</h3>
      <div className={styles.address__group}>
        <DropdownCountry setValid={setCountryValid} type={type} isReadonly={isReadonly} />
        <InputCity setValid={setCityValid} type={type} isReadonly={isReadonly} />
        <InputStreet setValid={setStreetValid} type={type} isReadonly={isReadonly} />
        <InputPostalCode setValid={setPostalCodeValid} type={type} isReadonly={isReadonly} />
      </div>
      <label>
        <input type="checkbox" name={value} id={value} defaultChecked={defaultChecked} />
        {` ${radioLabel}`}
      </label>
    </div>
  );
}
