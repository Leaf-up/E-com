import { useState } from 'react';
import { IdentityForm } from '../identity-form/identity-form';
import { PasswordForm } from '../password-form/password-form';
import { type TAddress } from '~/api/types';
import { ModalAddressEdit } from '../address/modal-address-edit/modal-address-edit';
import { Table } from '../address/table/table';
import { ModalAddressCreate } from '../address/modal-address-create/modal-address-create';
import styles from './profile.module.css';

const houseIcon = '/icons/house.svg';
const userIcon = '/icons/user.svg';
const editIcon = '/icons/edit.svg';
const circlePlusIcon = '/icons/circle-plus.svg';

export function Profile() {
  const [isIdentityEdit, setIsIdentityEdit] = useState(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);
  const [tab, setTab] = useState<'personal' | 'addresses'>('personal');
  const [isModalAddressEditOpen, setIsModalAddressEditOpen] = useState(false);
  const [isModalAddressCreateOpen, setIsModalAddressCreateOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<TAddress | null>(null);
  const [addressType, setAddressType] = useState<'shipping' | 'billing'>('shipping');

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
          <>
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
              <IdentityForm isEdit={isIdentityEdit} disableEditMode={() => setIsIdentityEdit(false)} />
            </div>
            <div className={styles.info__item}>
              {!isPasswordEdit && (
                <img
                  src={editIcon}
                  alt="edit"
                  className={styles.info__item_icon}
                  onClick={() => setIsPasswordEdit(true)}
                  aria-hidden
                />
              )}
              <span className={styles.info__item_title}>Change Password</span>
              {isPasswordEdit && <PasswordForm disableEditMode={() => setIsPasswordEdit(false)} />}
            </div>
          </>
        )}
        {tab === 'addresses' && (
          <>
            <div className={styles.info__item}>
              {!isIdentityEdit && (
                <img
                  src={circlePlusIcon}
                  alt="circle"
                  className={styles.info__item_icon}
                  onClick={() => {
                    setAddressType('shipping');
                    setIsModalAddressCreateOpen(true);
                  }}
                  aria-hidden
                />
              )}
              <span className={styles.info__item_title}>Shipping addresses</span>
              <Table
                type="shipping"
                onEditClick={(address) => {
                  setIsModalAddressEditOpen(true);
                  setEditingAddress(address);
                  setAddressType('shipping');
                }}
              />
            </div>
            <div className={styles.info__item}>
              <img
                src={circlePlusIcon}
                alt="circle"
                className={styles.info__item_icon}
                onClick={() => {
                  setAddressType('billing');
                  setIsModalAddressCreateOpen(true);
                }}
                aria-hidden
              />
              <span className={styles.info__item_title}>Billing addresses</span>
              <Table
                type="billing"
                onEditClick={(address) => {
                  setIsModalAddressEditOpen(true);
                  setEditingAddress(address);
                  setAddressType('billing');
                }}
              />
            </div>
            <ModalAddressEdit
              isOpen={isModalAddressEditOpen}
              type={addressType}
              address={editingAddress}
              closeModal={() => {
                setIsModalAddressEditOpen(false);
                setEditingAddress(null);
              }}
            />
            <ModalAddressCreate
              isOpen={isModalAddressCreateOpen}
              type={addressType}
              closeModal={() => setIsModalAddressCreateOpen(false)}
            />
          </>
        )}
      </div>
    </div>
  );
}
