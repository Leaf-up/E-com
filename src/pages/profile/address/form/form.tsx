import { type FormEvent, useState, useRef, useEffect } from 'react';
import type FormProps from './types';
import { Address, ButtonSubmit, FormError } from '~/ui';
import type { TAddress } from '~/api/types';
import styles from './form.module.css';

export function Form({ type, address, sendRequest, onCancelButtonClick }: FormProps) {
  const [cityValid, setCityValid] = useState(Boolean(address));
  const [streetValid, setStreetValid] = useState(Boolean(address));
  const [postalCodeValid, setPostalCodeValid] = useState(Boolean(address));
  const [countryValid, setCountryValid] = useState(Boolean(address));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!ref.current || !address) {
      return;
    }

    if (ref.current[`${type}-postal-code`]) {
      ref.current[`${type}-postal-code`].value = address.postalCode ?? '';
    }
    if (ref.current[`${type}-country`]) {
      ref.current[`${type}-country`].value = address.country ?? '';
    }
    if (ref.current[`${type}-city`]) {
      ref.current[`${type}-city`].value = address.city ?? '';
    }
    if (ref.current[`${type}-street`]) {
      ref.current[`${type}-street`].value = address.streetName ?? '';
    }
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = getFormData();

    const data: TAddress = {
      country: formData?.country ?? '',
      city: formData?.city.trim() ?? '',
      streetName: formData?.streetName.trim() ?? '',
      postalCode: formData?.postalCode ?? '',
    };

    setLoading(true);
    setError('');

    const result = sendRequest(data);
    if (result) {
      result
        .catch((reason: string) => {
          setError(reason);
        })
        .finally(() => {
          setLoading(false);
        });
    }
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
        <button type="button" className={styles.form__buttons_cancel} onClick={() => onCancelButtonClick()}>
          Cancel
        </button>
        <ButtonSubmit loading={loading} disabled={!countryValid || !cityValid || !streetValid || !postalCodeValid}>
          Save
        </ButtonSubmit>
      </div>
    </form>
  );
}
