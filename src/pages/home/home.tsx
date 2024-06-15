import { useEffect, useState } from 'react';
import type { TProduct } from '~/api/products/types';
import type { TCartPromo } from '~/api/promo/types';
import { promoHolder } from '~/api';
import { productsLocal } from '~/entities';
import { CardSlider, CardCategory } from '~/ui';
import { Slider, CopyInput } from '~/widgets';
import { CATEGORY_SLUG, CATEGORY_NAME } from '~/constants/constants';

import styles from './home.module.css';

const productMapper = (item: TProduct, i: number) => {
  const {
    name: { 'en-US': name },
    description: { 'en-US': description },
    masterVariant: { attributes, images, prices },
  } = item;

  const link = `/products/${item.key}`;
  const price = prices && prices[0] ? prices[0].value.centAmount / 10 ** prices[0].value.fractionDigits : 0;
  const product = { name, description, attributes, images, price, link };
  return <CardSlider {...product} key={i} />;
};

export function Home() {
  const [products, setProducts] = useState<TProduct[] | null>(null);
  const [promoCodes, setPromoCodes] = useState<TCartPromo[]>([]);
  const sliderItems = (products ?? []).slice(0, 7).map(productMapper);

  useEffect(() => {
    productsLocal.products.then((data) => setProducts(data));
    promoHolder.get().then((data) => setPromoCodes(data));
  }, []);

  return (
    <>
      <div className={styles.bottle1} />
      <div className={styles.bottle2} />
      <div className={styles.bottle3} />
      <section className={styles.welcome}>
        <h1 className={styles.welcome__title}>Welcome to &quot;Magic seeds&quot; online shop!</h1>
        <Slider items={sliderItems} />
      </section>
      <section className={styles.category}>
        {CATEGORY_SLUG.reduce<JSX.Element[]>((acc, slug, i) => {
          if (slug) acc.push(<CardCategory key={slug} slug={slug} name={CATEGORY_NAME[i]} />);
          return acc;
        }, [])}
      </section>
      <section className={styles.promo}>
        <h3>Free promo codes:</h3>
        <ul className={styles.promo__list}>
          {promoCodes.map((item, i) => (
            <li key={i} className={styles.promo__list_item}>
              <CopyInput text={item.code} />
              <div>{item.description['en-US']}</div>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.about}>
        <div>It is a fun project (not a real shop)</div>
        <div>
          Developed by the <a href="https://github.com/Leaf-up">Leaf up</a> team in 2024
        </div>
      </section>
    </>
  );
}
