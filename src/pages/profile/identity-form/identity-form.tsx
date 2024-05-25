import { type FormEvent, useEffect, useRef, useState } from 'react';
import { performProfileUpdate } from '~/api';
import type { TProfileData } from './types';
import { useCustomer } from '~/entities';
import { ButtonSubmit, FormError, InputDate, InputEmail, InputText } from '~/ui';
import { message } from '~/widgets';
import type IdentityFormProps from './types';
import styles from './identity-form.module.css';

export function IdentityForm({ isEdit, disableEditMode }: IdentityFormProps) {
  const { user } = useCustomer();
  const [emailValid, setEmailValid] = useState(true);
  const [dateValid, setDateValid] = useState(true);
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!ref.current || isEdit) {
      return;
    }

    ref.current.email.value = user?.email ?? '';
    ref.current['first-name'].value = user?.firstName ?? '';
    ref.current['last-name'].value = user?.lastName ?? '';
    ref.current['date-of-birth'].value =
      (user &&
        new Date(user?.dateOfBirth)
          .toLocaleDateString('en-US')
          .split('/')
          .map((el) => (el.length < 2 ? el.padStart(2, '0') : el))
          .join('.')) ??
      '';
  }, [user, ref, isEdit]);

  const getFormData = () => {
    if (!ref.current) return null;
    const data = new FormData(ref.current);

    return {
      email: data.get('email')?.toString() ?? '',
      firstName: data.get('first-name')?.toString() ?? '',
      lastName: data.get('last-name')?.toString() ?? '',
      dateOfBirth: new Date(data.get('date-of-birth')?.toString() ?? ''),
    };
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = getFormData();
    const ISODateOfBirth =
      formData &&
      new Date(formData.dateOfBirth.getTime() - formData.dateOfBirth.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10);

    const data: TProfileData = {
      email: formData?.email ?? '',
      firstName: formData?.firstName ?? '',
      lastName: formData?.lastName ?? '',
      dateOfBirth: ISODateOfBirth ?? '',
    };

    if (user) {
      performProfileUpdate(user, [
        {
          action: 'setFirstName',
          firstName: data.firstName,
        },
        {
          action: 'setLastName',
          lastName: data.lastName,
        },
        {
          action: 'changeEmail',
          email: data.email,
        },
        {
          action: 'setDateOfBirth',
          dateOfBirth: data.dateOfBirth,
        },
      ]).then((response) => {
        if (response.error) {
          setLoading(false);
          setError(response.error);
          message.show(response.error, 'error');
          return;
        }
        setLoading(false);
        if (response.customer) {
          message.show('User details was successfully updated');
        }
        disableEditMode();
      });
    }
  };

  return (
    <form className={styles.form} ref={ref} onSubmit={handleSubmit}>
      <div className={styles.form__group}>
        <InputText
          label={`First name${isEdit ? '*' : ''}`}
          name="first-name"
          id="first-name"
          placeholder="Enter your first name"
          readonly={!isEdit}
          inputClass={!isEdit ? styles.input : undefined}
          setValid={setFirstNameValid}
        />
        <InputText
          label={`Last name${isEdit ? '*' : ''}`}
          name="last-name"
          id="last-name"
          placeholder="Enter your last name"
          readonly={!isEdit}
          inputClass={!isEdit ? styles.input : undefined}
          setValid={setLastNameValid}
        />
      </div>
      <div className={styles.form__group}>
        <InputEmail
          setValid={setEmailValid}
          inputClass={!isEdit ? styles.input : undefined}
          readonly={!isEdit}
          label={`Email${isEdit ? '*' : ''}`}
        />
        <InputDate
          setValid={setDateValid}
          inputClass={!isEdit ? styles.input : undefined}
          readonly={!isEdit}
          label={`Date of birth${isEdit ? '*' : ''}`}
        />
      </div>
      <FormError error={error} />
      <div className={isEdit ? styles.form__buttons : styles.form__buttons_hidden}>
        <ButtonSubmit loading={loading} disabled={!firstNameValid || !lastNameValid || !dateValid || !emailValid}>
          Save
        </ButtonSubmit>
        <button
          type="button"
          className={styles.form__buttons_cancel}
          onClick={() => {
            setError('');
            disableEditMode();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
