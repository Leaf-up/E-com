import { useEffect, useState } from 'react';
import { Input } from '~/shared';
import { validationRules, checkRules } from '~/utils';
import InputEmailProps from './types';

const emailRules = validationRules().notEmpty().noSpaces().email().finalize();
const validateEmail = (email: string | null) => checkRules(email, emailRules);

export function InputEmail({ setValid }: InputEmailProps) {
  const [value, setValue] = useState<string | null>(null);
  const errorMessage = validateEmail(value);

  useEffect(() => {
    setValid(!errorMessage);
  }, [errorMessage, setValid]);

  return (
    <Input
      label="Email"
      type="text"
      name="email"
      id="email"
      placeholder="Enter your email"
      errorMessage={value !== null ? errorMessage : null}
      onInput={(email) => setValue(email)}
    />
  );
}
