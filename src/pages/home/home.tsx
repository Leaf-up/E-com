import type { TProduct } from '~/api/products/types';
import { CardSlider, CardCategory } from '~/ui';
import { Slider } from '~/widgets';
import { useProducts } from '~/entities';
import { CATEGORY_SLUG, CATEGORY_NAME } from '~/constants/constants';
import styles from './home.module.css';

const productMapper = (item: TProduct, i: number) => {
  const {
    name: { 'en-US': name },
    description: { 'en-US': description },
    masterVariant: { attributes, images, prices },
  } = item;

  // Render
  const link = `/products/${item.key}`;
  const price = prices && prices[0] ? prices[0].value.centAmount / 10 ** prices[0].value.fractionDigits : 0;
  const product = { name, description, attributes, images, price, link };
  return <CardSlider {...product} key={i} />;
};

export function Home() {
  const { products } = useProducts();

  const sliderItems = (products ?? []).slice(0, 7).map(productMapper);

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
      <section className={styles.about}>
        <div>It is a fun project (not a real shop)</div>
        <div>
          Developed by the <a href="https://github.com/Leaf-up">Leaf up</a> team in 2024
        </div>
      </section>
    </>
  );
}
