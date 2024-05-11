import { useEffect, useState } from 'react';
import { DropDown } from '~/shared';
import { checkRules, validationRules } from '~/utils';
import DropDownCountryProps from './types';

const rules = validationRules().notEmpty().finalize();
const validateDropDownCountry = (email: string | null) => checkRules(email, rules);

export function DropDownCountry({ setValid }: DropDownCountryProps) {
  const [value, setValue] = useState<string>('');
  const errorMessage = validateDropDownCountry(value);

  useEffect(() => {
    setValid(!errorMessage);
  }, [errorMessage, setValid]);

  return (
    <DropDown
      label="Country"
      name="country"
      id="country"
      placeholder="Select a country"
      value={value}
      options={['US']}
      errorMessage={errorMessage}
      setValue={setValue}
    />
  );
}
