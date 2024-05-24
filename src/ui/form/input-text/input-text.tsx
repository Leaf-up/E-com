import { useState } from 'react';
import { Input } from '~/shared';
import { validationRules, checkRules } from '~/utils';
import type InputTextProps from './types';

const textRules = validationRules().notEmpty().onlyLetters().minSize(3).finalize();
const validateText = (email: string | null) => checkRules(email, textRules);

export function InputText({ label, name, id, placeholder, setValid }: InputTextProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Input
      label={label}
      name={name}
      id={id}
      placeholder={placeholder}
      errorMessage={errorMessage}
      onChange={(inputValue) => {
        const error = validateText(inputValue);
        setErrorMessage(error);
        setValid(!error);
      }}
    />
  );
}
