import { type FormEvent, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Pagination } from 'antd';
import { useProducts } from '~/entities';
import { search } from '~/api';
import type { TProduct } from '~/api/products/types';
import { CardProduct, Select, Search } from '~/ui';
import { message } from '~/widgets';
import {
  CATEGORY_NAME,
  CATEGORY_SLUG,
  SUBCATEGORY_SLUG,
  SUBCATEGORY_NAME,
  SORTING_NAME,
  SORTING_PARAM,
} from '~/constants/constants';

import styles from './catalog.module.css';

const hatSrc = '/image/hat2.png';
const pageSize = 10;

export default function Catalog() {
  const { category: slug, subcategory } = useParams();
  const { products, category } = useProducts();
  const [page, setPage] = useState(1);
  const [selectedCategory, setCategory] = useState(slug ? CATEGORY_SLUG.indexOf(slug) : 2);
  const [selectedSubCategory, setSubCategory] = useState(slug ? SUBCATEGORY_SLUG.indexOf(subcategory) : 2);
  const [sorting, setSorting] = useState<number>(0);
  const searchFieldRef = useRef<HTMLInputElement>(null);

  const filterCategory = (categories: { id: string }[]) => {
    if (!category || (!CATEGORY_SLUG[selectedCategory] && !SUBCATEGORY_SLUG[selectedSubCategory])) return true;
    return (
      (!CATEGORY_SLUG[selectedCategory] ||
        categories.some(({ id }) => category[id] && category[id] === CATEGORY_SLUG[selectedCategory])) &&
      (!SUBCATEGORY_SLUG[selectedSubCategory] ||
        categories.some(({ id }) => category[id] && category[id] === SUBCATEGORY_SLUG[selectedSubCategory]))
    );
  };

  const productMapper = (item: TProduct, i: number) => {
    const {
      categories,
      name: { 'en-US': name },
      description: { 'en-US': description },
      masterVariant: { attributes, images, prices },
    } = item;

    // Filters
    if (!filterCategory(categories)) return null;

    // Render
    const link = `/products${CATEGORY_SLUG[selectedCategory] ? `/${CATEGORY_SLUG[selectedCategory]}` : ''}${SUBCATEGORY_SLUG[selectedSubCategory] ? `/${SUBCATEGORY_SLUG[selectedSubCategory]}` : ''}/${item.key}`;
    const price = prices && prices[0] ? prices[0].value.centAmount / 10 ** prices[0].value.fractionDigits : 0;
    const discounted =
      prices && prices[0] && prices[0].discounted
        ? prices[0].discounted.value.centAmount / 10 ** prices[0].discounted.value.fractionDigits
        : null;
    const product = { name, description, attributes, images, price, discounted, link };
    return <CardProduct {...product} key={i} />;
  };

  const productList = (products ?? []).reduce<JSX.Element[]>((acc, item, i) => {
    const el = productMapper(item, i);
    if (el) acc.push(el);
    return acc;
  }, []);

  const searchSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchFieldRef.current) searchFieldRef.current.blur();

    const formData = new FormData(e.currentTarget);
    const keyword = formData.get('search')?.toString() ?? '';
    search(keyword).then((response) => {
      setPage(1);
      if (response.error) {
        message.show(response.error, 'error');
        return;
      }
      if (response.data) {
        if (!response.data.length) {
          message.show(`Found nothing with keyword "${keyword}"`, 'error');
          return;
        }
      }
    });
  };

  const searchClear = () => {
    if (searchFieldRef.current) searchFieldRef.current.value = '';
    search().then(() => setPage(1));
  };

  const sortChangeHandler = (value: number) => {
    setSorting(value);
    search(undefined, [SORTING_PARAM[value]]);
  };

  return (
    <section className={styles.catalog} aria-label="Catalog">
      <div className={styles.filters}>
        <form className={styles.filters__search} onSubmit={searchSubmitHandler}>
          <Search searchClear={searchClear} ref={searchFieldRef} />
        </form>
        <h3 className={styles.filters__title}>Filters</h3>
        <Select name="Category" options={CATEGORY_NAME} value={selectedCategory} onChange={setCategory} />
        {selectedCategory != 2 && (
          <Select name="Type" options={SUBCATEGORY_NAME} value={selectedSubCategory} onChange={setSubCategory} />
        )}
        <img className={styles.filters__img} src={hatSrc} alt="hat" />
      </div>
      <div className={styles.products}>
        <div className={styles.products__meta}>
          <div className={styles.products__meta_sorting}>
            <span>Sorting</span>
            <Select options={SORTING_NAME} value={sorting} onChange={sortChangeHandler} />
          </div>
          <div>{`Total: ${products?.length}`}</div>
        </div>
        <div className={styles.products__list}>
          {!productList.length && <p>No products to show</p>}
          {productList.length !== 0 && (
            <>
              {productList.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)}
              <Pagination total={productList.length} pageSize={pageSize} onChange={(p) => setPage(p)} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
