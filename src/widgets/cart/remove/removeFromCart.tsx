import { changeCart } from '~/api';
import type { TCartUpdateAction } from '~/api/cart/types';
import { useCustomer } from '~/entities';
import { message } from '~/widgets';

import styles from './button.module.css';

const trashIcon = '/icons/trash.svg';

export default function RemoveFromCart({ id }: { id: string }) {
  const { cart } = useCustomer();

  const haveItem = () => {
    if (!cart) return false;
    return !cart.lineItems.some((item) => item.productId === id);
  };

  const productId = cart?.lineItems.find((el) => el.productId === id)?.id ?? id;

  const removeLineItem = () => {
    const action: TCartUpdateAction = {
      action: 'removeLineItem',
      lineItemId: productId,
    };

    if (cart) {
      changeCart(cart.id, cart.version, [action]).then((response) => {
        if (response.error) message.show(response.error, 'error');
        else message.show('Product was deleted from cart');
      });
    }
  };

  return (
    <button className={styles.button} onClick={removeLineItem} disabled={haveItem()}>
      <img src={trashIcon} alt="remove" />
    </button>
  );
}