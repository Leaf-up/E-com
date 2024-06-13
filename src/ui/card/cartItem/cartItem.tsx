import { useState } from 'react';
import { TLineItem } from '~/api/cart/types';
import { changeCart } from '~/api';
import { useCustomer } from '~/entities';
import { message } from '~/widgets';

import styles from './.module.css';

const trashIcon = '/icons/trash.svg';

export default function CardCart({ item }: { item: TLineItem }) {
  const { cart } = useCustomer();
  const [quantity, setQuantity] = useState(item.quantity);

  const price = item.variant.prices[0].discounted
    ? item.variant.prices[0].discounted.value.centAmount / 10 ** item.variant.prices[0].discounted.value.fractionDigits
    : item.variant.prices[0].value.centAmount / 100;

  const setQuantityHandler = (n: number) => {
    setQuantity(n);

    if (cart) {
      changeCart(cart.id, cart.version, [
        {
          action: 'changeLineItemQuantity',
          productId: item.id,
          lineItemId: item.id,
          quantity: n,
        },
      ]);
    }
  };

  const handleDecreaseButtonClick = () => {
    if (quantity > 1) {
      setQuantityHandler(quantity - 1);
    }
  };

  const handleIncreaseButtonClick = () => {
    if (quantity < 30) {
      setQuantityHandler(quantity + 1);
    }
  };

  const removeProductHandler = () => {
    if (cart) {
      changeCart(cart.id, cart.version, [
        {
          action: 'removeLineItem',
          lineItemId: item.id,
        },
      ]).then((response) => {
        if (response.error) message.show(response.error, 'error');
        else message.show('Product was deleted from cart');
      });
    }
  };

  return (
    <div className={styles.cart__item}>
      <img className={styles.cart__item_img} src={item.variant.images[0].url} alt={item.productKey} />
      <div className={styles.cart__item_info}>
        <span className={styles.name}>{item.name['en-US']}</span>
        <span className={styles.price}>{price}$</span>
        <div className={styles.quantity}>
          <button
            type="button"
            className={styles.quantity__button}
            onClick={handleDecreaseButtonClick}
            disabled={quantity === 1}
          >
            &#8211;
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            className={styles.quantity__button}
            onClick={handleIncreaseButtonClick}
            disabled={quantity >= 10}
          >
            +
          </button>
        </div>
        <span className={styles.price}>{item.totalPrice.centAmount / 100}$</span>
        <img src={trashIcon} alt="trash" className={styles.trash} onClick={removeProductHandler} aria-hidden />
      </div>
    </div>
  );
}
