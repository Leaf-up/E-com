import { useEffect, useState } from 'react';
import { Input } from '~/shared';
import { validationRules, checkRules } from '~/utils';
import type InputTextProps from './types';

const textRules = validationRules().notEmpty().onlyNumbers().minSize(5).maxSize(5).finalize();

export function InputPostalCode({ setValid, type, isDisabled }: InputTextProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onChange = (postalCode: string) => {
    if (isDisabled) return;

    const error = checkRules(postalCode, textRules);
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
      label="Postal code*"
      name={`${type}-postal-code`}
      id={`${type}-postal-code`}
      placeholder="Enter your postal code"
      errorMessage={errorMessage}
      disabled={isDisabled}
      onChange={onChange}
    />
  );
}
