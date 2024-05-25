import { type FormEvent, useState, useRef } from 'react';
import { ButtonSubmit, FormError, InputPassword } from '~/ui';
import type PasswordFormProps from './types';
import { performChangePassword } from '~/api';
import { TPasswordsData } from './types';
import { message } from '~/widgets';
import { useCustomer } from '~/entities';
import styles from './password-form.module.css';

export function PasswordForm({ disableEditMode }: PasswordFormProps) {
  const { user } = useCustomer();
  const [currentPasswordValid, setCurrentPasswordValid] = useState(false);
  const [newPasswordValid, setNewPasswordValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const ref = useRef<HTMLFormElement>(null);

  const getFormData = () => {
    if (!ref.current) return null;
    const data = new FormData(ref.current);

    return {
      currentPassword: data.get('current-password')?.toString() ?? '',
      newPassword: data.get('new-password')?.toString() ?? '',
    };
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = getFormData();

    const data: TPasswordsData = {
      currentPassword: formData?.currentPassword ?? '',
      newPassword: formData?.newPassword ?? '',
    };

    if (data.currentPassword === data.newPassword) {
      setError('The current and new password must be different');
      setLoading(false);
      return;
    }

    if (user) {
      performChangePassword(user, data.currentPassword, data.newPassword).then((response) => {
        if (response.error) {
          setLoading(false);
          setError(response.error);
          message.show(response.error, 'error');
          return;
        }
        setLoading(false);
        if (response.customer) {
          message.show('User password was successfully changed');
        }
        disableEditMode();
      });
    }
  };

  return (
    <form className={styles.form} ref={ref} onSubmit={handleSubmit}>
      <div className={styles.form__group}>
        <InputPassword setValid={setCurrentPasswordValid} label="Current password*" name="current-password" />
        <InputPassword setValid={setNewPasswordValid} label="New password*" name="new-password" />
      </div>
      <FormError error={error} />
      <div className={styles.form__buttons}>
        <ButtonSubmit loading={loading} disabled={!currentPasswordValid || !newPasswordValid}>
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
