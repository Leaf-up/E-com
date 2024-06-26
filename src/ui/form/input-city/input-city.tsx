import { useState } from 'react';
import { Input } from '~/shared';
import { validationRules, checkRules } from '~/utils';
import type InputCityProps from './types';

const textRules = validationRules().notEmpty().string().finalize();
const validateCity = (email: string | null) => checkRules(email, textRules);

export function InputCity({ setValid, type, isReadonly }: InputCityProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onChange = (city: string) => {
    if (isReadonly) return;

    const error = validateCity(city);
    setErrorMessage(error);
    setValid(!error);
  };

  return (
    <Input
      label="City*"
      name={`${type}-city`}
      id={`${type}-city`}
      placeholder="Enter your city"
      errorMessage={errorMessage}
      readonly={isReadonly}
      onChange={onChange}
    />
  );
}
