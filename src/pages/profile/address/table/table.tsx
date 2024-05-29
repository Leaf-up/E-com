import { useEffect, useRef, useState } from 'react';
import { useCustomer } from '~/entities';
import type TableProps from './types';
import { performProfileUpdate } from '~/api';
import { message } from '~/widgets';
import type { TAddress } from '~/api/types';
import { Popup } from '~/shared';
import styles from './table.module.css';

const dotsIcon = '/icons/dots.svg';

function OpenPopupButton({ setRef }: { setRef: (ref: React.RefObject<HTMLImageElement>) => void }) {
  const ref = useRef<HTMLImageElement>(null);

  return (
    <img src={dotsIcon} alt="dots" className={styles.td__icon} onClick={() => setRef(ref)} aria-hidden ref={ref} />
  );
}

export function Table({ type, onEditClick }: TableProps) {
  const { user } = useCustomer();
  const [popupState, setPopupState] = useState<{
    address: TAddress | null;
    buttonRef: React.RefObject<HTMLImageElement> | null;
  }>({
    address: null,
    buttonRef: null,
  });

  useEffect(() => {
    const hidePopup = (e: MouseEvent) => {
      if (popupState.buttonRef && popupState.buttonRef.current !== e.target) {
        setPopupState({ address: null, buttonRef: null });
      }
    };

    document.body.addEventListener('click', hidePopup);
    return () => document.body.removeEventListener('click', hidePopup);
  });

  const removeAddress = (id: string | undefined) => {
    if (user) {
      performProfileUpdate(user, [
        {
          action: 'removeAddress',
          addressId: id,
        },
      ]).then((response) => {
        if (response.error) {
          message.show(response.error, 'error');
          return;
        }

        if (response.customer) {
          message.show(`Address was successfully removed`);
        }
      });
    }
  };

  const setDefaultAddress = (id: string | undefined) => {
    if (user) {
      performProfileUpdate(user, [
        {
          action: type === 'billing' ? 'setDefaultBillingAddress' : 'setDefaultShippingAddress',
          addressId: id,
        },
      ]).then((response) => {
        if (response.error) {
          message.show(response.error, 'error');
          return;
        }

        if (response.customer) {
          message.show(`Address was successfully set as default`);
        }
      });
    }
  };

  return !user || (type === 'billing' ? !user.billingAddressIds.length : !user.shippingAddressIds.length) ? (
    <span>The address list is empty</span>
  ) : (
    <>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>Country</th>
            <th className={styles.th}>City</th>
            <th className={styles.th}>Street</th>
            <th className={styles.th}>Postal code</th>
            <th className={styles.th_hidden}>Default</th>
            <th className={styles.th_hidden}>Dots</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {user &&
            user.addresses
              .filter(
                (address) =>
                  address.id &&
                  (type === 'billing'
                    ? user.billingAddressIds.includes(address.id)
                    : user.shippingAddressIds.includes(address.id)),
              )
              .map((el) => (
                <tr className={styles.tr} key={el.id}>
                  <td className={styles.td}>{el.country}</td>
                  <td className={styles.td}>{el.city}</td>
                  <td className={styles.td}>{el.streetName}</td>
                  <td className={styles.td}>{el.postalCode}</td>
                  <td className={styles.td}>
                    {(type === 'billing'
                      ? user.defaultBillingAddressId === el.id
                      : user.defaultShippingAddressId === el.id) && <span className={styles.td__default}>Default</span>}
                  </td>
                  <td className={`${styles.td} ${styles.td_icon}`} aria-hidden>
                    <OpenPopupButton
                      setRef={(ref) => {
                        setPopupState((prev) => {
                          if (prev.address?.id === el.id) {
                            return {
                              address: null,
                              buttonRef: null,
                            };
                          }

                          return {
                            address: el,
                            buttonRef: ref,
                          };
                        });
                      }}
                    />
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      <Popup targetRef={popupState.buttonRef}>
        <button
          type="button"
          className={styles.td__button}
          onClick={() => {
            popupState.address && onEditClick(popupState.address);
            setPopupState({ address: null, buttonRef: null });
          }}
        >
          Edit
        </button>
        <button
          type="button"
          className={styles.td__button}
          onClick={() => {
            popupState.address && removeAddress(popupState.address.id);
            setPopupState({ address: null, buttonRef: null });
          }}
        >
          Delete
        </button>
        <button
          type="button"
          className={`${styles.td__button} ${
            popupState.address &&
            (type === 'billing'
              ? popupState.address.id === user.defaultBillingAddressId
              : popupState.address.id === user.defaultShippingAddressId) &&
            styles.td__button_hidden
          }`}
          onClick={() => {
            popupState.address && setDefaultAddress(popupState.address.id);
            setPopupState({ address: null, buttonRef: null });
          }}
        >
          Set as default
        </button>
      </Popup>
    </>
  );
}
