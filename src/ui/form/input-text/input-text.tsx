import { useState } from 'react';
import { Input } from '~/shared';
import { validationRules, checkRules } from '~/utils';
import type InputTextProps from './types';

const textRules = validationRules().notEmpty().onlyLetters().minSize(3).finalize();
const validateText = (email: string | null) => checkRules(email, textRules);

export function InputText({ label, name, id, value, placeholder, readonly, inputClass, setValid }: InputTextProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Input
      label={label}
      name={name}
      id={id}
      value={value}
      placeholder={placeholder}
      readonly={readonly}
      inputClass={inputClass}
      errorMessage={errorMessage}
      onChange={(inputValue) => {
        const error = validateText(inputValue);
        setErrorMessage(error);
        setValid(!error);
      }}
    />
  );
}
