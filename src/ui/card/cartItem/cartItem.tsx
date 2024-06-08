import { useState } from 'react';
import { TLineItem } from '~/api/cart/types';
import Select from '~/ui/form/select/select';
import { changeCart } from '~/api';
import { useCustomer } from '~/entities';

import styles from './.module.css';

export default function CardCart({ item }: { item: TLineItem }) {
  const { cart } = useCustomer();
  const [quantity, setQuantity] = useState(item.quantity - 1);

  const setQuantityHandler = (n: number) => {
    setQuantity(n);

    cart &&
      changeCart(cart.id, cart.version, [
        {
          action: 'changeLineItemQuantity',
          productId: item.id,
          lineItemId: item.id,
          quantity: n + 1,
        },
      ]);
  };
  return (
    <div className={styles.cart__item}>
      <img className={styles.cart__item_img} src={item.variant.images[0].url} alt={item.productKey} />
      <div className={styles.cart__item_info}>
        <span className={styles.name}>{item.name['en-US']}</span>
        <span className={styles.price}>
          {item.variant.prices[0].discounted
            ? item.variant.prices[0].discounted.value.centAmount /
              10 ** item.variant.prices[0].discounted.value.fractionDigits
            : item.variant.prices[0].value.centAmount / 100}
          $
        </span>
        <div className={styles.select}>
          <Select
            title="Quantity"
            options={[...Array(10)].map((_, i) => String(i + 1))}
            value={quantity}
            onChange={setQuantityHandler}
          />
        </div>
        <span className={styles.price}>{item.totalPrice.centAmount / 100}$</span>
      </div>
    </div>
  );
}
