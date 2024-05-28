import { NavLink } from 'react-router-dom';
import { CATEGORY_DESC } from '~/constants/constants';
import styles from './category.module.css';

const IMG = {
  'positive-effect': '/image/flower.png',
  'negative-effect': '/image/mooshroom.png',
};

export default function CardCategory({ name, slug }: { name: string; slug: string }) {
  return (
    <NavLink to={`/catalog/${slug}`} className={styles.card}>
      <h3 className={styles.card__title}>{`${name} seeds`}</h3>
      <div className={styles.card__desc}>
        {slug === 'positive-effect' && <img className={styles.card__img} src={IMG[slug]} alt="" />}
        <p>{CATEGORY_DESC[slug as keyof typeof CATEGORY_DESC]}</p>
        {slug === 'negative-effect' && <img className={styles.card__img} src={IMG[slug]} alt="" />}
      </div>
    </NavLink>
  );
}
