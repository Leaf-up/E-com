import { isObject } from '~/utils/types';
import { TCardProductProps } from './types';
import styles from './product.module.css';

const tagNames = ['weight', 'color', 'size', 'charm'];

export default function CardProduct({ name, description, attributes, images, price }: TCardProductProps) {
  const image = images[0];
  let brand = '';
  const tags = (attributes ?? []).reduce<string[]>((acc, item) => {
    if (tagNames.includes(item.name)) {
      if (isObject<{ label: string }>(item.value)) {
        acc.push(item.value.label);
      } else if (item.name === 'charm') {
        acc.push('charmed');
      } else {
        acc.push(item.value);
      }
    } else if (item.name === 'brand') brand = item.value.toString();
    return acc;
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.card__preview}>
        <img src={image.url} alt={image.label} />
      </div>
      <div className={styles.card__info}>
        <div>
          <h1 className={styles.card__info_title}>{name}</h1>
          <div>{`Brand: ${brand}`}</div>
          <p>{description}</p>
        </div>
        <ul className={styles.card__info_attr_list}>
          {tags.map((tag, i) => (
            <li className={styles.card__info_tag} key={i}>
              {tag}
            </li>
          ))}
          <li>{`price: ${price.toFixed(2)}$`}</li>
        </ul>
      </div>
    </div>
  );
}
