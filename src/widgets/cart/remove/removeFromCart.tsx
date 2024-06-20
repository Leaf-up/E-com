import { useState } from 'react';
import { changeCart } from '~/api';
import type { TCartUpdateAction } from '~/api/cart/types';
import { useCustomer } from '~/entities';
import { message } from '~/widgets';

import styles from './button.module.css';

const trashIcon = '/icons/trash.svg';
const loadingIcon = '/icons/loading.svg';

export default function RemoveFromCart({ id }: { id: string }) {
  const { cart } = useCustomer();
  const [loading, setLoading] = useState(false);

  const haveItem = () => {
    if (!cart || !cart.lineItems) return false;
    return cart.lineItems.some((item) => item.productId === id);
  };

  const productId = cart?.lineItems.find((el) => el.productId === id)?.id ?? id;

  const removeLineItem = () => {
    setLoading(true);
    const action: TCartUpdateAction = {
      action: 'removeLineItem',
      lineItemId: productId,
    };

    if (cart) {
      changeCart(cart.id, cart.version, [action]).then((response) => {
        if (response.error) message.show(response.error, 'error');
        else message.show('Product was deleted from cart');
        setLoading(false);
      });
    }
  };

  return (
    <button className={styles.button} onClick={removeLineItem} disabled={!haveItem() || loading}>
      <img src={trashIcon} alt="remove" />
      {loading && <img className={styles.button__loading} src={loadingIcon} alt="" />}
    </button>
  );
}
