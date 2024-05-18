import { Input } from '~/shared';
import { DropdownCountry } from '../dropdown-country/dropdown-country';
import { InputPostalCode } from '../input-postal-code/input-postal-code';
import { InputStreet } from '../input-street/input-street';
import { InputCity } from '../input-city/input-city';
import AddressProps from './types';
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
  isDisabled,
}: AddressProps) {
  return (
    <div className={styles.address}>
      <span className={styles.address__title}>{title}</span>
      <DropdownCountry setValid={setCountryValid} type={type} isDisabled={isDisabled} />
      <InputCity setValid={setCityValid} type={type} isDisabled={isDisabled} />
      <InputStreet setValid={setStreetValid} type={type} isDisabled={isDisabled} />
      <InputPostalCode setValid={setPostalCodeValid} type={type} isDisabled={isDisabled} />
      <Input
        label={radioLabel}
        type="radio"
        name="default-address"
        id={value}
        value={value}
        defaultChecked={defaultChecked}
      />
    </div>
  );
}
