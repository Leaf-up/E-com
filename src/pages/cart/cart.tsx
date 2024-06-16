import { useEffect, useState } from 'react';
import { clearCart, requestCart, changeCart, promoHolder } from '~/api';
import { useCustomer } from '~/entities';
import { CardCart, ButtonBack } from '~/ui';
import { Modal } from '~/shared';
import { message } from '~/widgets';

import styles from './cart.module.css';

export function Cart() {
  const { cart } = useCustomer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discountCodes, setDiscountCodes] = useState<string[]>([]);
  const cartItems =
    cart && cart.totalLineItemQuantity ? cart.lineItems.map((item, i) => <CardCart key={i} item={item} />) : [];

  useEffect(() => {
    if (cart) requestCart(cart.id);
  }, []);

  useEffect(() => {
    if (cart && cart.discountCodes) {
      promoHolder.get().then((codes) => {
        const applyed = cart.discountCodes.reduce<string[]>((acc, item) => {
          const { id } = item.discountCode;
          for (let i = 0; i < codes.length; i += 1) {
            if (id === codes[i].id) acc.push(codes[i].code);
          }
          return acc;
        }, []);
        setDiscountCodes(applyed);
      });
    }
  }, [cart]);

  const clearCartHandler = () => {
    if (cart) {
      clearCart(cart.id, cart.version);
    }
  };

  const promoSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const code = formData.get('promocode')?.toString();
    if (cart && code) {
      changeCart(cart.id, cart.version, [{ action: 'addDiscountCode', code }]).then((response) => {
        if (response.error) message.show(response.error, 'error');
        else form.reset();
      });
    }
  };

  if (cart && cartItems.length) {
    return (
      <section aria-label="Cart" className={styles.cart}>
        <div className={styles.cart__items}>{cartItems}</div>
        <div className={styles.cart__total}>
          <button className={styles.cart__total_clear} onClick={() => setIsModalOpen(true)}>
            Clear Shopping Cart
          </button>
          <p className={styles.cart__total_info}>
            {'Total: '}
            <span>{cart.totalLineItemQuantity}</span>
            {' for '}
            {cart.discountOnTotalPrice && (
              <span className={styles.cart__total_info_price_old}>
                {(cart.totalPrice.centAmount + cart.discountOnTotalPrice.discountedAmount.centAmount) / 100}
              </span>
            )}
            <span className={styles.cart__total_info_price}> {cart.totalPrice.centAmount / 100}$</span>
          </p>
        </div>
        <div className={styles.cart__promo}>
          <h3>Use promo code</h3>
          <ul className={styles.cart__promo_list}>
            {discountCodes.map((code, i) => (
              <li key={i}>{code}</li>
            ))}
          </ul>
          <form onSubmit={promoSubmitHandler}>
            <input className={styles.cart__promo_input} name="promocode" placeholder="PROMO-CODE" />
            <button className={styles.cart__promo_submit} type="submit">
              Apply
            </button>
          </form>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {isModalOpen && (
            <div className={styles.modal}>
              <div>Clear your shopping cart?</div>
              <div className={styles.modal__btn}>
                <button className={styles.modal__btn_cancel} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button className={styles.modal__btn_clear} onClick={clearCartHandler}>
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
