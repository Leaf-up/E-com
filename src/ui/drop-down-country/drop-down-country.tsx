import { useState } from 'react';
import { DropDown } from '~/shared';
import { checkRules, validationRules } from '~/utils';
import DropDownCountryProps from './types';

const rules = validationRules().notEmpty().finalize();
const validateDropDownCountry = (email: string | null) => checkRules(email, rules);

export function DropDownCountry({ setValid }: DropDownCountryProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <DropDown
      label="Country"
      name="country"
      id="country"
      placeholder="Select a country"
      options={['US']}
      errorMessage={errorMessage}
      onClick={(value) => {
        const error = validateDropDownCountry(value);
        setErrorMessage(error);
        setValid(!error);
      }}
    />
  );
}
