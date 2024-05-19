import { useEffect, useState } from 'react';
import { Input } from '~/shared';
import { validationRules, checkRules } from '~/utils';
import type InputTextProps from './types';

const textRules = validationRules().notEmpty().onlyNumbers().minSize(4).maxSize(8).finalize();

export function InputPostalCode({ setValid, type, isReadonly }: InputTextProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onChange = (postalCode: string) => {
    if (isReadonly) return;

    const error = checkRules(postalCode, textRules);
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
      label="Postal code*"
      name={`${type}-postal-code`}
      id={`${type}-postal-code`}
      placeholder="Enter your postal code"
      errorMessage={errorMessage}
      readonly={isReadonly}
      onChange={onChange}
    />
  );
}
