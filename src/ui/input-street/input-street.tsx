import { useState } from 'react';
import { Input } from '~/shared';
import { validationRules, checkRules } from '~/utils';
import InputStreetProps from './types';

const streetRules = validationRules().notEmpty().string().finalize();
const validateStreet = (email: string | null) => checkRules(email, streetRules);

export function InputStreet({ setValid }: InputStreetProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Input
      label="Street"
      name="street"
      id="street"
      placeholder="Enter your street"
      errorMessage={errorMessage}
      onChange={(inputValue) => {
        const error = validateStreet(inputValue);
        setErrorMessage(error);
        setValid(!error);
      }}
    />
  );
}
