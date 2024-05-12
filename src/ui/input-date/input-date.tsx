import { useState } from 'react';
import { Input } from '~/shared';
import { checkRules, validationRules } from '~/utils';
import InputDateProps from './types';

const dateRules = validationRules().notEmpty().date().minAge(13).finalize();
const validateDate = (email: string | null) => checkRules(email, dateRules);

export function InputDate({ setValid }: InputDateProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Input
      label="Date of birth"
      name="date-of-birth"
      id="date-of-birth"
      placeholder="MM.DD.YYYY"
      errorMessage={errorMessage}
      onChange={(date) => {
        const error = validateDate(date);
        setErrorMessage(error);
        setValid(!error);
      }}
    />
  );
}
