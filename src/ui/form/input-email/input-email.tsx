import { useState } from 'react';
import { Input } from '~/shared';
import { validationRules, checkRules } from '~/utils';
import type InputEmailProps from './types';

const emailRules = validationRules().notEmpty().noSpaces().email().finalize();
const validateEmail = (email: string | null) => checkRules(email, emailRules);

export function InputEmail({ setValid, value, readonly, inputClass, label }: InputEmailProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Input
      label={label ?? 'Email*'}
      name="email"
      id="email"
      value={value}
      placeholder="Enter your email"
      readonly={readonly}
      inputClass={inputClass}
      errorMessage={errorMessage}
      onChange={(email) => {
        const error = validateEmail(email);
        setErrorMessage(error);
        setValid(!error);
      }}
    />
  );
}
