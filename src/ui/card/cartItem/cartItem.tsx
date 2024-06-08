import { TLineItem } from '~/api/cart/types';

import styles from './.module.css';

export default function CardCart({ item }: { item: TLineItem }) {
  return (
    <div className={styles.cart__item}>
      <img className={styles.cart__item_img} src={item.variant.images[0].url} alt={item.productKey} />
      <div className={styles.cart__item_info}>
        <span>{item.name['en-US']}</span>
        <span>{item.variant.prices[0].value.centAmount / 100}$</span>
        <span>{item.quantity}</span>
        <span>{item.price.value.centAmount / 100}$</span>
      </div>
    </div>
  );
}
