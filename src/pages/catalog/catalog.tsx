import { type FormEvent, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Pagination } from 'antd';
import { useProducts } from '~/entities';
import { search } from '~/api';
import type { TProduct } from '~/api/products/types';
import { CardProduct, Select, Search } from '~/ui';
import { message } from '~/widgets';
import { CATEGORY_NAME, CATEGORY_SLUG, SUBCATEGORY_SLUG, SUBCATEGORY_NAME } from '~/constants/constants';

import styles from './catalog.module.css';

const hatSrc = '/image/hat2.png';
const pageSize = 10;

export default function Catalog() {
  const { category: slug, subcategory } = useParams();
  const { products, category } = useProducts();
  const [page, setPage] = useState(1);
  const [selectedCategory, setCategory] = useState(slug ? CATEGORY_SLUG.indexOf(slug) : 2);
  const [selectedSubCategory, setSubCategory] = useState(slug ? SUBCATEGORY_SLUG.indexOf(subcategory) : 2);
  const [searchResults, setSearchResults] = useState<string[]>([]);
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
    const productData = item.masterData.published ? item.masterData.current : item.masterData.staged;
    const {
      categories,
      name: { 'en-US': name },
      description: { 'en-US': description },
      masterVariant: { attributes, images, prices },
    } = productData;

    // Filters
    if (!filterCategory(categories)) return null;
    if (searchResults.length && !searchResults.includes(item.id)) return null;

    // Render
    const link = `/products${CATEGORY_SLUG[selectedCategory] ? `/${CATEGORY_SLUG[selectedCategory]}` : ''}${SUBCATEGORY_SLUG[selectedSubCategory] ? `/${SUBCATEGORY_SLUG[selectedSubCategory]}` : ''}/${item.key}`;
    const price = prices && prices[0] ? prices[0].value.centAmount / 10 ** prices[0].value.fractionDigits : 0;
    const product = { name, description, attributes, images, price, link };
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
      if (response.error) {
        message.show(response.error, 'error');
        return;
      }
      if (response.data) {
        if (!response.data.length) {
          message.show(`Found nothing with keyword "${keyword}"`, 'error');
          return;
        }
        const arr = response.data.reduce<string[]>((acc, item) => {
          acc.push(item.id);
          return acc;
        }, []);
        setSearchResults(arr);
      }
    });
  };

  const searchClear = () => {
    if (searchFieldRef.current) searchFieldRef.current.value = '';
    setSearchResults([]);
  };

  return (
    <section className={styles.catalog} aria-label="Catalog">
      <div className={styles.filters}>
        <form onSubmit={searchSubmitHandler}>
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
        {!productList.length && <p>No products to show</p>}
        {productList.length !== 0 && (
          <>
            {productList.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)}
            <Pagination total={productList.length} pageSize={pageSize} onChange={(p) => setPage(p)} />
          </>
        )}
      </div>
    </section>
  );
}
