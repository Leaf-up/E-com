import { useCustomer } from '~/entities';
import type TableProps from './types';
import styles from './table.module.css';
import { performProfileUpdate } from '~/api';
import { message } from '~/widgets';

const editIcon = '/icons/edit.svg';
const trashIcon = '/icons/trash.svg';

export function Table({ type, onEditClick }: TableProps) {
  const { user } = useCustomer();

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

  return user && (type === 'billing' ? user.billingAddressIds.length !== 0 : user.shippingAddressIds.length !== 0) ? (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          <th className={styles.th}>Country</th>
          <th className={styles.th}>City</th>
          <th className={styles.th}>Street</th>
          <th className={styles.th}>Postal code</th>
          <th className={styles.th_hidden}>Default</th>
          <th className={styles.th_hidden}>Edit</th>
          <th className={styles.th_hidden}>Delete</th>
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
                <td className={`${styles.td} ${styles.td_icon}`}>
                  <img
                    src={editIcon}
                    alt="edit"
                    className={styles.td__icon}
                    onClick={() => onEditClick(el)}
                    aria-hidden
                  />
                </td>
                <td className={`${styles.td} ${styles.td_icon}`}>
                  <img
                    src={trashIcon}
                    alt="trash"
                    className={styles.td__icon}
                    onClick={() => removeAddress(el.id)}
                    aria-hidden
                  />
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  ) : (
    <span>The address list is empty</span>
  );
}
