import { prepareCart, changeCart } from '~/api';
import type { TCartUpdateAction } from '~/api/cart/types';
import { useCustomer } from '~/entities';
import { message } from '~/widgets';

import styles from './button.module.css';

const cartIcon = '/icons/cart.svg';

export default function AddToCart({ id }: { id: string }) {
  const { cart } = useCustomer();

  const haveItem = () => {
    if (!cart || !cart.lineItems) return false;
    return cart.lineItems.some((item) => item.productId === id);
  };

  const addLineItem = (cartId: string, version: number) => {
    const action: TCartUpdateAction = {
      action: 'addLineItem',
      productId: id,
    };
    changeCart(cartId, version, [action]).then((response) => {
      if (response.error) message.show(response.error, 'error');
      else message.show('Product was added to cart');
    });
  };

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (!cart) {
      prepareCart().then((response) => {
        if (response.cart) {
          addLineItem(response.cart.id, response.cart.version);
        }
      });
    } else {
      addLineItem(cart.id, cart.version);
    }
  };

  return (
    <button className={styles.button} onClick={clickHandler} disabled={haveItem()}>
      <img src={cartIcon} alt="add" />
    </button>
  );
}
