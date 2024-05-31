import { NavLink } from 'react-router-dom';
import { isObject } from '~/utils/types';
import { TCardProductProps } from './types';

import styles from './product.module.css';

const bottleSrc = '/image/bottle1.png';
const tagNames = ['weight', 'color', 'size', 'charm'];

export default function CardProduct({ name, description, attributes, images, price, link }: TCardProductProps) {
  const image = images[0];
  let brand = '';
  const tags = (attributes ?? []).reduce<JSX.Element[]>((acc, item) => {
    if (tagNames.includes(item.name)) {
      if (isObject<{ label: string }>(item.value)) {
        if (item.name === 'color') {
          acc.push(<div className={styles[`card__info_attr_${item.value.label}`]} />);
        } else {
          acc.push(<div className={styles.card__info_attr_tag}>{item.value.label}</div>);
        }
      } else if (item.name === 'charm') {
        if (item.value) {
          acc.push(<img className={styles.card__info_attr_img} src={bottleSrc} alt="" />);
        }
      } else {
        acc.push(<div className={styles.card__info_attr_tag}>{item.value}</div>);
      }
    } else if (item.name === 'brand') brand = item.value.toString();
    return acc;
  }, []);

  return (
    <NavLink to={link} className={styles.card}>
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
            <li key={i}>{tag}</li>
          ))}
          <li>{`price: ${price.toFixed(2)}$`}</li>
        </ul>
      </div>
    </NavLink>
  );
}
