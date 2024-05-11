import { useState } from 'react';
import { Input } from '~/shared';
import { validationRules, checkRules } from '~/utils';
import InputTextProps from './types';

const textRules = validationRules().notEmpty().onlyNumbers().minSize(5).maxSize(5).finalize();
const validatePostalCode = (email: string | null) => checkRules(email, textRules);

export function InputPostalCode({ setValid }: InputTextProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Input
      label="Postal code"
      name="postal-code"
      id="postal-code"
      placeholder="Enter your postal code"
      errorMessage={errorMessage}
      onChange={(postalCode) => {
        const error = validatePostalCode(postalCode);
        setErrorMessage(error);
        setValid(!error);
      }}
    />
  );
}
