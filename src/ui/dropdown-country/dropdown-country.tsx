import { useEffect, useState } from 'react';
import { Dropdown } from '~/shared';
import { checkRules, validationRules } from '~/utils';
import type DropDownCountryProps from './types';

const rules = validationRules().notEmpty().finalize();
const validateDropDownCountry = (email: string | null) => checkRules(email, rules);

export function DropdownCountry({ setValid, type, isDisabled }: DropDownCountryProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onClick = (country: string) => {
    if (isDisabled) return;

    const error = validateDropDownCountry(country);
    setErrorMessage(error);
    setValid(!error);
  };

  useEffect(() => {
    if (isDisabled) {
      setErrorMessage(null);
      setValid(true);
    }
  }, [isDisabled, setValid]);

  return (
    <Dropdown
      label="Country*"
      name={`${type}-country`}
      id={`${type}-country`}
      placeholder="Select a country"
      options={['US']}
      errorMessage={errorMessage}
      isDisabled={isDisabled}
      onClick={onClick}
    />
  );
}
