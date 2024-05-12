import { useState } from 'react';
import { Input } from '~/shared';
import { validationRules, checkRules } from '~/utils';
import InputEmailProps from './types';

const emailRules = validationRules().notEmpty().noSpaces().email().finalize();
const validateEmail = (email: string | null) => checkRules(email, emailRules);

export function InputEmail({ setValid }: InputEmailProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Input
      label="Email"
      name="email"
      id="email"
      placeholder="Enter your email"
      errorMessage={errorMessage}
      onChange={(email) => {
        const error = validateEmail(email);
        setErrorMessage(error);
        setValid(!error);
      }}
    />
  );
}
