import { useEffect, useRef, useState, type FormEvent } from 'react';
import { InputDate, InputEmail, InputPassword, InputText, ButtonSubmit, FormError, FormLink, Address } from '~/ui';
import { TRegisterData } from '~/api/auth/types';
import performRegister from '~/api/auth/create';
import { message } from '~/widgets';
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
  const [billingCityValid, setBillingCityValid] = useState(false);
  const [billingStreetValid, setBillingStreetValid] = useState(false);
  const [billingPostalCodeValid, setBillingPostalCodeValid] = useState(false);
  const [billingCountryValid, setBillingCountryValid] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sameAddress, setSameAddress] = useState(false);
  const ref = useRef<HTMLFormElement>(null);

  const getFormData = () => {
    if (!ref.current) return null;
    const data = new FormData(ref.current);

    return {
      email: data.get('email')?.toString() ?? '',
      password: data.get('password')?.toString() ?? '',
      firstName: data.get('first-name')?.toString() ?? '',
      lastName: data.get('last-name')?.toString() ?? '',
      dateOfBirth: new Date(data.get('date-of-birth')?.toString() ?? ''),
      shippingCity: data.get('shipping-city')?.toString() ?? '',
      shippingCountry: data.get('shipping-country')?.toString() ?? '',
      shippingPostalCode: data.get('shipping-postal-code')?.toString() ?? '',
      shippingStreetName: data.get('shipping-street')?.toString() ?? '',
      billingCity: data.get('billing-city')?.toString() ?? '',
      billingCountry: data.get('billing-country')?.toString() ?? '',
      billingPostalCode: data.get('billing-postal-code')?.toString() ?? '',
      billingStreetName: data.get('billing-street')?.toString() ?? '',
      defaultShippingAddress: data.get('shipping-address') ? 0 : undefined,
      defaultBillingAddress: data.get('billing-address') ? 1 : undefined,
    };
  };

  const onChange = () => {
    const data = getFormData();
    if (!data || !ref.current || !ref.current.checkbox.checked) return;
    if (ref.current['billing-city']) ref.current['billing-city'].value = data.shippingCity;
    if (ref.current['billing-country']) ref.current['billing-country'].value = data.shippingCountry;
    if (ref.current['billing-postal-code']) ref.current['billing-postal-code'].value = data.shippingPostalCode;
    if (ref.current['billing-street']) ref.current['billing-street'].value = data.shippingStreetName;
  };

  useEffect(() => {
    const data = getFormData();
    if (!data || !ref.current || sameAddress) return;
    if (ref.current['billing-city']) ref.current['billing-city'].value = '';
    if (ref.current['billing-country']) ref.current['billing-country'].value = '';
    if (ref.current['billing-postal-code']) ref.current['billing-postal-code'].value = '';
    if (ref.current['billing-street']) ref.current['billing-street'].value = '';
  }, [sameAddress]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = getFormData();
    const ISODateOfBirth =
      formData &&
      new Date(formData.dateOfBirth.getTime() - formData.dateOfBirth.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10);

    const data: TRegisterData = {
      email: formData?.email ?? '',
      password: formData?.password ?? '',
      firstName: formData?.firstName ?? '',
      lastName: formData?.lastName ?? '',
      dateOfBirth: ISODateOfBirth ?? '',
      addresses: [
        {
          city: formData?.shippingCity ?? '',
          country: formData?.shippingCountry ?? '',
          postalCode: formData?.shippingPostalCode ?? '',
          streetName: formData?.shippingStreetName ?? '',
        },
        {
          city: formData?.billingCity ?? '',
          country: formData?.billingCountry ?? '',
          postalCode: formData?.billingPostalCode ?? '',
          streetName: formData?.billingStreetName ?? '',
        },
      ],
      shippingAddresses: [0],
      billingAddresses: [1],
      defaultShippingAddress: formData?.defaultShippingAddress,
      defaultBillingAddress: formData?.defaultBillingAddress,
    };
    performRegister(data).then((response) => {
      if (response.error) {
        setError(response.error);
        setLoading(false);
        return;
      }
      setLoading(false);
      if (response.customer) {
        const { firstName, lastName } = response.customer;
        message.show(`Successfully registered as ${firstName} ${lastName}`);
      }
    });
  };

  return (
    <form className={styles.form} ref={ref} onSubmit={handleSubmit} onChange={onChange}>
      <div className={styles.form__group}>
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
      </div>
      <div className={styles.form__group}>
        <InputEmail setValid={setEmailValid} />
        <InputPassword setValid={setPasswordValid} />
      </div>
      <Address
        title="Shipping address"
        setCountryValid={setCountryValid}
        setCityValid={setCityValid}
        setStreetValid={setStreetValid}
        setPostalCodeValid={setPostalCodeValid}
        radioLabel="Set shipping address as default"
        value="shipping-address"
        defaultChecked
        type="shipping"
      />
      <label>
        <input
          type="checkbox"
          name="checkbox"
          disabled={!cityValid || !streetValid || !postalCodeValid || !countryValid}
          checked={sameAddress}
          onChange={() => setSameAddress(!sameAddress)}
        />
        {' Same shipping and billing address'}
      </label>
      <Address
        title="Billing address"
        setCountryValid={setBillingCountryValid}
        setCityValid={setBillingCityValid}
        setStreetValid={setBillingStreetValid}
        setPostalCodeValid={setBillingPostalCodeValid}
        isReadonly={sameAddress}
        isHidden={sameAddress}
        radioLabel="Set billing address as default"
        value="billing-address"
        type="billing"
      />
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
          !countryValid ||
          !billingCityValid ||
          !billingCountryValid ||
          !billingPostalCodeValid ||
          !billingStreetValid
        }
      >
        Sign up
      </ButtonSubmit>
      <FormLink text="Already have an account?" linkText="Sign in" path="/login" />
    </form>
  );
}
