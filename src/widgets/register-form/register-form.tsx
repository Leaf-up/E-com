import { useState, type FormEvent } from 'react';
import {
  InputDate,
  InputEmail,
  InputPassword,
  InputText,
  InputPostalCode,
  DropDownCountry,
  InputStreet,
  ButtonSubmit,
  FormError,
} from '~/ui';
import { TRegisterData } from '~/api/auth/types';
import performRegister from '~/api/auth/create';
import styles from './register-form.module.css';

export function RegistrationForm() {
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [dateValid, setDateValid] = useState(false);
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [lastNameValid, setLastNameValid] = useState(false);
  const [cityValid, setCityValid] = useState(false);
  const [streetValid, setStreetValid] = useState(false);
  const [postalCodeValid, setPostalCodeValid] = useState(false);
  const [countryValid, setCountryValid] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const dateOfBirth = new Date(formData.get('date-of-birth')?.toString() ?? '');
    const ISODateOfBirth = new Date(dateOfBirth.getTime() - dateOfBirth.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);

    const data: TRegisterData = {
      email: formData.get('email')?.toString() ?? '',
      password: formData.get('password')?.toString() ?? '',
      firstName: formData.get('first-name')?.toString() ?? '',
      lastName: formData.get('last-name')?.toString() ?? '',
      dateOfBirth: ISODateOfBirth,
      addresses: [
        {
          city: formData.get('city')?.toString() ?? '',
          country: formData.get('country')?.toString() ?? '',
          postalCode: formData.get('postal-code')?.toString() ?? '',
          streetName: formData.get('street')?.toString() ?? '',
        },
      ],
    };
    performRegister(data).then((response) => {
      if (response.error) {
        setError(response.error);
        setLoading(false);
        return;
      }
      console.log(response.customer);
      setLoading(false);
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <InputText
        label="First name*"
        name="first-name"
        id="first-name"
        placeholder="Enter your first name"
        setValid={setFirstNameValid}
      />
      <InputText
        label="Last name*"
        name="last-name"
        id="last-name"
        placeholder="Enter your last name"
        setValid={setLastNameValid}
      />
      <InputDate setValid={setDateValid} />
      <InputEmail setValid={setEmailValid} />
      <InputPassword setValid={setPasswordValid} />
      <DropDownCountry setValid={setCountryValid} />
      <InputText label="City*" name="city" id="city" placeholder="Enter your city" setValid={setCityValid} />
      <InputStreet setValid={setStreetValid} />
      <InputPostalCode setValid={setPostalCodeValid} />
      <FormError error={error} />
      <ButtonSubmit
        loading={loading}
        disabled={
          !emailValid ||
          !passwordValid ||
          !firstNameValid ||
          !lastNameValid ||
          !dateValid ||
          !cityValid ||
          !streetValid ||
          !postalCodeValid ||
          !countryValid
        }
      >
        Sign up
      </ButtonSubmit>
    </form>
  );
}
