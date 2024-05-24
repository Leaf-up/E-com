import { useState } from 'react';
import styles from './profile.module.css';
import houseIcon from '/icons/house.svg';
import userIcon from '/icons/user.svg';
import editIcon from '/icons/edit.svg';
import { IdentityForm } from '../identity-form/identity-form';

export function Profile() {
  const [isIdentityEdit, setIsIdentityEdit] = useState(false);
  const [tab, setTab] = useState<'personal' | 'addresses'>('personal');
  const addressesEl = <div>Addresses</div>;

  return (
    <div className={styles.profile}>
      <div className={styles.tabs}>
        <span className={styles.tabs__title}>Settings</span>
        <button
          type="button"
          className={tab === 'personal' ? `${styles.tabs__button_active} ${styles.tabs__button}` : styles.tabs__button}
          onClick={() => setTab('personal')}
        >
          <img src={userIcon} alt="user" />
          Personal information
        </button>
        <button
          type="button"
          className={tab === 'addresses' ? `${styles.tabs__button_active} ${styles.tabs__button}` : styles.tabs__button}
          onClick={() => setTab('addresses')}
        >
          <img src={houseIcon} alt="house" />
          Addresses
        </button>
      </div>
      <div className={styles.info}>
        {tab === 'personal' && (
          <div className={styles.info__item}>
            {!isIdentityEdit && (
              <img
                src={editIcon}
                alt="edit"
                className={styles.info__item_icon}
                onClick={() => setIsIdentityEdit(true)}
                aria-hidden
              />
            )}
            <span className={styles.info__item_title}>Identity</span>
            <IdentityForm isEdit={isIdentityEdit} onCancelClick={() => setIsIdentityEdit(false)} />
          </div>
        )}
        {tab === 'addresses' && addressesEl}
      </div>
    </div>
  );
}
