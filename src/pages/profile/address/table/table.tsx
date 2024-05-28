import { useCustomer } from '~/entities';
import type TableProps from './types';
import styles from './table.module.css';

const editIcon = '/icons/edit.svg';
const trashIcon = '/icons/trash.svg';

export function Table({ type, onEditClick }: TableProps) {
  const { user } = useCustomer();
  return (
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
            <tbody className={styles.tbody} key={el.id}>
              <tr className={styles.tr}>
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
                  <img src={trashIcon} alt="trash" className={styles.td__icon} aria-hidden />
                </td>
              </tr>
            </tbody>
          ))}
    </table>
  );
}
