import { useState } from 'react';
import { useProducts } from '~/entities';
import { TProduct } from '~/api/products/types';
import { CardProduct } from '~/ui';
import { Select } from '~/ui';

import { CATEGORY_NAME, CATEGORY_SLUG } from './constants';

import styles from './catalog.module.css';

export default function Catalog() {
  const { products, category } = useProducts();
  const [selectedCategory, setCategory] = useState(2);

  const filterCategory = (categories: { id: string }[]) =>
    categories.some(({ id }) => {
      if (!category || !CATEGORY_SLUG[selectedCategory]) return true;
      if (category && category[id] && category[id] === CATEGORY_SLUG[selectedCategory]) return true;
      return false;
    });

  const productMapper = (item: TProduct, i: number) => {
    const productData = item.masterData.published ? item.masterData.current : item.masterData.staged;
    const {
      categories,
      name: { 'en-US': name },
      description: { 'en-US': description },
      masterVariant: { attributes, images, prices },
    } = productData;

    // Filters
    if (!filterCategory(categories)) return null;

    // Render
    const link = `/products${CATEGORY_SLUG[selectedCategory] ? `/${CATEGORY_SLUG[selectedCategory]}` : ''}/${item.key}`;
    const price = prices && prices[0] ? prices[0].value.centAmount / 10 ** prices[0].value.fractionDigits : 0;
    const product = { name, description, attributes, images, price, link };
    return <CardProduct {...product} key={i} />;
  };

  return (
    <section className={styles.catalog} aria-label="Catalog">
      <div className={styles.filters}>
        <h3>Filters</h3>
        <Select name="Category" options={CATEGORY_NAME} value={2} onChange={setCategory} />
      </div>
      <div className={styles.products}>
        {!products || (!products.length && <p>Catalog is empty</p>)}
        {products?.map(productMapper)}
      </div>
    </section>
  );
}
