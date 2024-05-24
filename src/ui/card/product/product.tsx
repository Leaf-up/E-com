import { TCardProductProps } from './types';
import styles from './product.module.css';

export default function CardProduct({ name, description, attributes, images, price }: TCardProductProps) {
  const image = images[0];

  return (
    <div className={styles.card}>
      <div className={styles.card__preview}>
        <img src={image.url} alt={image.label} />
      </div>
      <div className={styles.card__info}>
        <div>
          <h1 className={styles.card__info_title}>{name}</h1>
          <p>{description}</p>
        </div>
        <ul className={styles.card__info_attr_list}>
          {attributes?.map((attr, i) => <li key={i}>{`${attr.name}: ${attr.value}`}</li>)}
          <li>{`price: ${price.toFixed(2)}$`}</li>
        </ul>
      </div>
    </div>
  );
}
