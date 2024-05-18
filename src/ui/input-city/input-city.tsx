import { useEffect, useState } from 'react';
import { Input } from '~/shared';
import { validationRules, checkRules } from '~/utils';
import type InputCityProps from './types';

const textRules = validationRules().notEmpty().onlyLetters().finalize();
const validateCity = (email: string | null) => checkRules(email, textRules);

export function InputCity({ setValid, type, isDisabled }: InputCityProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onChange = (city: string) => {
    if (isDisabled) return;

    const error = validateCity(city);
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
    <Input
      label="City*"
      name={`${type}-city`}
      id={`${type}-city`}
      placeholder="Enter your city"
      errorMessage={errorMessage}
      disabled={isDisabled}
      onChange={onChange}
    />
  );
}
