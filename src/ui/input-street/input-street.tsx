import { useEffect, useState } from 'react';
import { Input } from '~/shared';
import { validationRules, checkRules } from '~/utils';
import type InputStreetProps from './types';

const streetRules = validationRules().notEmpty().string().finalize();
const validateStreet = (email: string | null) => checkRules(email, streetRules);

export function InputStreet({ setValid, type, isReadonly }: InputStreetProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onChange = (street: string) => {
    if (isReadonly) return;

    const error = validateStreet(street);
    setErrorMessage(error);
    setValid(!error);
  };

  useEffect(() => {
    if (isReadonly) {
      setErrorMessage(null);
      setValid(true);
    }
  }, [isReadonly, setValid]);

  return (
    <Input
      label="Street*"
      name={`${type}-street`}
      id={`${type}-street`}
      placeholder="Enter your street"
      errorMessage={errorMessage}
      readonly={isReadonly}
      onChange={onChange}
    />
  );
}
