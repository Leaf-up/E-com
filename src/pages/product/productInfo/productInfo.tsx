import { isObject } from '~/utils/types';
import ImageSlider from './imageSlider/slider';
import { TCardProductProps } from './types';
import styles from './product.module.css';

const starYellow = '/icons/star.svg';
const starGray = '/icons/star_gray.svg';
const bottleSrc = '/image/bottle1.png';
const tagNames = ['weight', 'color', 'size', 'charm'];

export default function ProductInfo({
  name,
  description,
  attributes,
  images,
  price,
  discounted,
  category,
  rating,
}: TCardProductProps) {
  let brand = '';
  const tags = (attributes ?? []).reduce<{ name: string; value: string | JSX.Element }[]>((acc, item) => {
    if (tagNames.includes(item.name)) {
      if (isObject<{ label: string }>(item.value)) {
        if (item.name === 'color') {
          acc.push({ name: 'color', value: <div className={styles[`card__info_attr_${item.value.label}`]} /> });
        } else {
          acc.push({ name: item.name, value: item.value.label });
        }
      } else if (item.name === 'charm') {
        if (item.value) {
          acc.push({ name: 'charmed', value: <img className={styles.card__info_attr_img} src={bottleSrc} alt="" /> });
        }
      } else {
        acc.push({ name: item.name, value: item.value });
      }
    } else if (item.name === 'brand') brand = item.value.toString();
    return acc;
  }, []);
  const stars = Array.from({ length: 5 }, (_, i) => (
    <img key={i} src={i < (rating ?? 0) ? starYellow : starGray} alt="" />
  ));

  const priceEl = discounted ? (
    <>
      <span className={styles.card__info_old_price}>{price.toFixed(2)}</span>
      <span className={styles.card__info_new_price}>{` ${discounted.toFixed(2)}$`}</span>
    </>
  ) : (
    <span>{`${price.toFixed(2)}$`}</span>
  );

  return (
    <div className={styles.card}>
      <div className={styles.card__preview}>
        <ImageSlider items={images.map((item) => item.url)} />
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
                  <td className={styles.card__info_attr_value}>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            {'price: '}
            {priceEl}
          </p>
        </div>
      </div>
    </div>
  );
}
