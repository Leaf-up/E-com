import { useEffect, useState } from 'react';
import { clearCart, requestCart } from '~/api';
import { useCustomer } from '~/entities';
import { CardCart, ButtonBack } from '~/ui';
import { Modal } from '~/shared';

import styles from './cart.module.css';

export function Cart() {
  const { cart } = useCustomer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartItems =
    cart && cart.totalLineItemQuantity ? cart.lineItems.map((item, i) => <CardCart key={i} item={item} />) : [];

  useEffect(() => {
    /* Stupid action (cart is allready in store).
     ** Added only to match "The list of items is fetched from the commercetools API" criteria.
     */
    if (cart) requestCart(cart.id);
  }, []);

  const clearCartHandler = () => {
    if (cart) {
      clearCart(cart.id, cart.version);
    }
  };

  if (cart && cartItems.length) {
    return (
      <section aria-label="Cart" className={styles.cart}>
        <div className={styles.cart__items}>{cartItems}</div>
        <p className={styles.cart__total}>
          {'Total: '}
          <span>{cart.totalLineItemQuantity}</span>
          {' for '}
          <span className={styles.cart__total_price}>{cart.totalPrice.centAmount / 100}$</span>
        </p>
        <button className={styles.cart__clear_button} onClick={() => setIsModalOpen(true)}>
          Clear Shopping Cart
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {isModalOpen && (
            <div className={styles.modal}>
              <div>Clear your shopping cart?</div>
              <div className={styles.buttons}>
                <button className={styles.buttons__cancel} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button className={styles.buttons__clear} onClick={clearCartHandler}>
                  Clear
                </button>
              </div>
            </div>
          )}
        </Modal>
      </section>
    );
  }

  return (
    <>
      <p>Cart is empty</p>
      <ButtonBack to="/catalog">Go to catalog</ButtonBack>
    </>
  );
}
