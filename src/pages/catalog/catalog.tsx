import { type FormEvent, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Pagination } from 'antd';
import { useProducts } from '~/entities';
import { filter } from '~/api';
import type { TProduct } from '~/api/products/types';
import type { TFilterData } from '~/api/types';
import { CardProduct, Select, Search, Range } from '~/ui';
import { message } from '~/widgets';
import {
  CATEGORY_NAME,
  CATEGORY_SLUG,
  SUBCATEGORY_SLUG,
  SUBCATEGORY_NAME,
  SORTING_NAME,
  SORTING_PARAM,
  FILTERS,
} from '~/constants/constants';

import styles from './catalog.module.css';

const hatSrc = '/image/hat2.png';
const pageSize = 10;

export default function Catalog() {
  const { category: slug, subcategory } = useParams();
  const { products, category } = useProducts();
  const [page, setPage] = useState(1);
  const [selectedCategory, setCategory] = useState(slug ? CATEGORY_SLUG.indexOf(slug) : 0);
  const [selectedSubCategory, setSubCategory] = useState(slug ? SUBCATEGORY_SLUG.indexOf(subcategory) : 0);
  const [sorting, setSorting] = useState<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const searchFieldRef = useRef<HTMLInputElement>(null);

  const getFormData = (sort = sorting) => {
    if (!formRef.current) return undefined;
    const formData = new FormData(formRef.current);
    const data: TFilterData = {
      keyword: formData.get('search')?.toString() ?? '',
      sorting: SORTING_PARAM[sort] === 'None' ? null : SORTING_PARAM[sort],
      priceMin: Number(formData.get('price-min')) ?? 0,
      priceMax: Number(formData.get('price-max')) ?? 0,
      brand: formData.get('brand')?.toString() === 'None' ? null : formData.get('brand')?.toString() ?? '',
      weightMin: Number(formData.get('weight-min')) ?? 0,
      weightMax: Number(formData.get('weight-max')) ?? 0,
      color: formData.get('color')?.toString() === 'None' ? null : formData.get('color')?.toString() ?? '',
      size: formData.get('size')?.toString() === 'None' ? null : formData.get('size')?.toString() ?? '',
      charm: formData.get('charm')?.toString() === 'None' ? null : Boolean(formData.get('charm')),
    };
    return data;
  };

  const filterSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.currentTarget) {
      filter(getFormData()).then((response) => {
        if (response.error) message.show(response.error, 'error');
        if (response.data && response.data.length === 0) message.show('Found nothing', 'error');
        setPage(1);
      });
    }
  };

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

  const filtersReset = () => {
    setCategory(0);
    setSubCategory(0);
    setSorting(0);
    window.history.pushState({}, '', '/catalog');
    console.log('filtersReset');
    filter().then(() => setPage(1));
  };

  const searchReset = () => {
    if (searchFieldRef.current) searchFieldRef.current.value = '';
    filter().then(() => setPage(1));
  };

  const setCategoryHandler = (n: number) => {
    setCategory(n);
    let subCategorySlug = selectedSubCategory ? `/${SUBCATEGORY_SLUG[selectedSubCategory]}` : '';
    if (n === 0) {
      setSubCategory(0);
      subCategorySlug = '';
    }
    window.history.pushState({}, '', `/catalog${n ? `/${CATEGORY_SLUG[n]}${subCategorySlug}` : ''}`);
  };

  const setSubCategoryHandler = (n: number) => {
    setSubCategory(n);
    const subCategorySlug = n ? `/${SUBCATEGORY_SLUG[n]}` : '';
    window.history.pushState({}, '', `/catalog/${CATEGORY_SLUG[selectedCategory]}${subCategorySlug}`);
  };

  const setSortingHandler = (value: number) => {
    console.log('setSortingHandler');
    setSorting(value);
    filter(getFormData(value)).then(() => setPage(1));
  };

  return (
    <section className={styles.catalog} aria-label="Catalog">
      <div className={styles.filters}>
        <form ref={formRef} className={styles.filters__search} onSubmit={filterSubmitHandler}>
          <Search searchClear={searchReset} ref={searchFieldRef} />
          <h3 className={styles.filters__title}>Filters</h3>
          <div>
            <Select title="Category" options={CATEGORY_NAME} value={selectedCategory} onChange={setCategoryHandler} />
            {selectedCategory !== 0 && (
              <Select
                title="Type"
                options={SUBCATEGORY_NAME}
                value={selectedSubCategory}
                onChange={setSubCategoryHandler}
              />
            )}
          </div>
          <Range title="Price" name="price" min={0} max={500} step={10} />
          <Select title="Brand" name="brand" options={FILTERS.brand} />
          <Range title="Weight" name="weight" min={1} max={10} />
          <Select title="Color" name="color" options={FILTERS.color} />
          <Select title="Size" name="size" options={FILTERS.size} />
          <Select title="Charmed" name="charm" options={FILTERS.charmed} />
          <div className={styles.filters__btn}>
            <button type="submit" className={styles.filters__btn_submit}>
              Apply
            </button>
            <button type="reset" className={styles.filters__btn_reset} onClick={filtersReset}>
              Reset
            </button>
          </div>
        </form>
        <img className={styles.filters__img} src={hatSrc} alt="hat" />
      </div>
      <div className={styles.products}>
        <div className={styles.products__meta}>
          <div className={styles.products__meta_sorting}>
            <span>Sorting</span>
            <Select options={SORTING_NAME} value={sorting} onChange={setSortingHandler} />
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
