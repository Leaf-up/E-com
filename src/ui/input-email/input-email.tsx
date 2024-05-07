import { useEffect } from 'react';
import { Input } from '~/shared';
import { validationRules, checkRules } from '~/utils';

interface InputEmailProps {
  value: string | null;
  setValue: (value: string) => void;
  setValid: (valid: boolean) => void;
}

const emailRules = validationRules().nullable().notEmpty().noSpaces().email().finalize();
const validateEmail = (email: string | null) => checkRules(email, emailRules);

export function InputEmail({ value, setValue, setValid }: InputEmailProps) {
  const errorMessage = validateEmail(value);

  useEffect(() => {
    setValid(!errorMessage);
  }, [errorMessage, setValid]);

  return (
    <Input
      label="Email"
      type="text"
      id="email"
      placeholder="Enter your email"
      errorMessage={errorMessage}
      onInput={(email) => setValue(email)}
    />
  );
}
