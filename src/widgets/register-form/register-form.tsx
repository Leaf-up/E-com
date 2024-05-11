import { useState, type FormEvent } from 'react';
import { InputDate, InputEmail, InputPassword, InputText, InputPostalCode, DropDownCountry, InputStreet } from '~/ui';
import styles from './register-form.module.css';

export function RegistrationForm() {
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [dateValid, setDateValid] = useState<boolean>(false);
  const [firstNameValid, setFirstNameValid] = useState<boolean>(false);
  const [lastNameValid, setLastNameValid] = useState<boolean>(false);
  const [cityValid, setCityValid] = useState<boolean>(false);
  const [streetValid, setStreetValid] = useState<boolean>(false);
  const [postalCodeValid, setPostalCodeValid] = useState<boolean>(false);
  const [countryValid, setCountryValid] = useState<boolean>(false);

  console.log(!dateValid || !cityValid || !streetValid || !postalCodeValid || !countryValid);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Perform login
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <InputText
        label="First name"
        name="first-name"
        id="first-name"
        placeholder="Enter your first name"
        setValid={setFirstNameValid}
      />
      <InputText
        label="Last name"
        name="last-name"
        id="last-name"
        placeholder="Enter your last name"
        setValid={setLastNameValid}
      />
      <InputDate setValid={setDateValid} />
      <InputEmail setValid={setEmailValid} />
      <InputPassword setValid={setPasswordValid} />
      <DropDownCountry setValid={setCountryValid} />
      <InputText label="City" name="city" id="city" placeholder="Enter your city" setValid={setCityValid} />
      <InputStreet setValid={setStreetValid} />
      <InputPostalCode setValid={setPostalCodeValid} />
      <button
        className={styles.form__button}
        type="submit"
        disabled={!emailValid || !passwordValid || !firstNameValid || !lastNameValid}
      >
        Sign up
      </button>
    </form>
  );
}
