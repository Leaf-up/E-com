import { Image } from 'antd';
import { isObject } from '~/utils/types';
import { TCardProductProps } from './types';
import styles from './product.module.css';

const starYellow = '/icons/star.svg';
const starGray = '/icons/star_gray.svg';
const tagNames = ['weight', 'color', 'size', 'charm'];

export default function ProductInfo({
  name,
  description,
  attributes,
  images,
  price,
  category,
  rating,
}: TCardProductProps) {
  const image = images[0];
  let brand = '';
  const tags = (attributes ?? []).reduce<Record<'name' | 'value', string>[]>((acc, item) => {
    if (tagNames.includes(item.name)) {
      if (isObject<{ label: string }>(item.value)) {
        acc.push({ name: item.name, value: item.value.label });
      } else if (item.name === 'charm') {
        acc.push({ name: 'charmed', value: item.value ? 'yes' : 'no' });
      } else {
        acc.push({ name: item.name, value: item.value });
      }
    } else if (item.name === 'brand') brand = item.value.toString();
    return acc;
  }, []);
  const stars = Array.from({ length: 5 }, (_, i) => (
    <img key={i} src={i < (rating ?? 0) ? starYellow : starGray} alt="" />
  ));

  return (
    <div className={styles.card}>
      <div className={styles.card__preview}>
        <Image width={200} src={image.url} />
      </div>
      <div className={styles.card__info}>
        <div>
          <h1 className={styles.card__info_title}>{name}</h1>
          <div>
            {stars}
            <span>{` ${rating?.toFixed(1)}`}</span>
          </div>
          {category && <div>{`Category: ${category}`}</div>}
          <div>{`Brand: ${brand}`}</div>
          <p>{description}</p>
          <table>
            <tbody>
              {tags.map((item, i) => (
                <tr key={i}>
                  <td className={styles.card__info_attr_name}>{item.name}</td>
                  <td>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>{`price: ${price.toFixed(2)}$`}</p>
        </div>
      </div>
    </div>
  );
}
