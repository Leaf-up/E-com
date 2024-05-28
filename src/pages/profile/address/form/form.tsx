import { type FormEvent, useState, useRef, useEffect } from 'react';
import type FormProps from './types';
import { Address, ButtonSubmit, FormError } from '~/ui';
import { type TAddress } from '~/api/types';
import styles from './form.module.css';

export function Form({ type, address, loading, error, sendRequest, onCancelButtonClick }: FormProps) {
  const [cityValid, setCityValid] = useState(true);
  const [streetValid, setStreetValid] = useState(true);
  const [postalCodeValid, setPostalCodeValid] = useState(true);
  const [countryValid, setCountryValid] = useState(true);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!ref.current || !address) {
      return;
    }

    ref.current[`${type}-postal-code`].value = address.postalCode ?? '';
    ref.current[`${type}-country`].value = address.country ?? '';
    ref.current[`${type}-city`].value = address.city ?? '';
    ref.current[`${type}-street`].value = address.streetName ?? '';
  }, [ref, address?.postalCode, address?.country, address?.city, address?.streetName, type, address]);

  const getFormData = () => {
    if (!ref.current) return null;

    const data = new FormData(ref.current);

    return {
      city: data.get(`${type}-city`)?.toString() ?? '',
      country: data.get(`${type}-country`)?.toString() ?? '',
      postalCode: data.get(`${type}-postal-code`)?.toString() ?? '',
      streetName: data.get(`${type}-street`)?.toString() ?? '',
    };
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = getFormData();

    const data: TAddress = {
      country: formData?.country ?? '',
      city: formData?.city ?? '',
      streetName: formData?.streetName ?? '',
      postalCode: formData?.postalCode ?? '',
    };

    sendRequest(data);
  };

  return (
    <form className={styles.form} ref={ref} onSubmit={handleSubmit}>
      <Address
        setCityValid={setCityValid}
        setCountryValid={setCountryValid}
        setPostalCodeValid={setPostalCodeValid}
        setStreetValid={setStreetValid}
        type={type}
      />
      <FormError error={error} />
      <div className={styles.form__buttons}>
        <ButtonSubmit loading={loading} disabled={!countryValid || !cityValid || !streetValid || !postalCodeValid}>
          Save
        </ButtonSubmit>
        <button type="button" className={styles.form__buttons_cancel} onClick={onCancelButtonClick}>
          Cancel
        </button>
      </div>
    </form>
  );
}
