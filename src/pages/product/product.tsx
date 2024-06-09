import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestProducts } from '~/api';
import { TRawProduct } from '~/api/products/types';
import { Page404 } from '~/pages';
import { Loader, Breadcrumbs } from '~/ui';
import ProductInfo from './productInfo/productInfo';
import { CATEGORY_NAME, CATEGORY_SLUG, SUBCATEGORY_SLUG, SUBCATEGORY_NAME } from '~/constants/constants';

import styles from './product.module.css';

export default function Product() {
  const { category, subcategory, key } = useParams();
  const [product, setProduct] = useState<TRawProduct | null | '404'>(null);
  const categoryName = !category ? null : CATEGORY_NAME[CATEGORY_SLUG.indexOf(category)];
  const subCategoryName = !subcategory ? null : SUBCATEGORY_NAME[SUBCATEGORY_SLUG.indexOf(subcategory)];

  useEffect(() => {
    requestProducts(key).then((response) => {
      if (response.error) setProduct('404');
      if (response.data) {
        if (!response.data.length) setProduct('404');
        else setProduct(response.data[0]);
      }
    });
  }, [category, key]);

  if ((category && !categoryName) || (subcategory && !subCategoryName)) return <Page404 />;

  const productMapper = (item: TRawProduct) => {
    const productData = item.masterData.published ? item.masterData.current : item.masterData.staged;
    const {
      name: { 'en-US': name },
      description: { 'en-US': description },
      masterVariant: { attributes, images, prices },
    } = productData;

    const price = prices && prices[0] ? prices[0].value.centAmount / 10 ** prices[0].value.fractionDigits : 0;
    const discounted =
      prices && prices[0] && prices[0].discounted
        ? prices[0].discounted.value.centAmount / 10 ** prices[0].discounted.value.fractionDigits
        : null;
    const rating = Math.floor(Math.random() * 2) + 3;
    const props = {
      id: item.id,
      name,
      description,
      attributes,
      images,
      price,
      discounted,
      category: categoryName,
      rating,
    };
    return <ProductInfo {...props} />;
  };

  if (!product) return <Loader />;
  if (product === '404') return <Page404 />;

  const breadcrumbsItems = [
    { title: 'Home', link: '/' },
    { title: 'Catalog', link: '/catalog' },
  ];
  if (categoryName) {
    breadcrumbsItems.push({ title: categoryName, link: `/catalog/${category}` });
    if (subCategoryName) {
      breadcrumbsItems.push({ title: subCategoryName, link: `/catalog/${category}/${subcategory}` });
    }
  }
  breadcrumbsItems.push({ title: product.masterData.current.name['en-US'], link: '' });

  return (
    <div className={styles.product}>
      <Breadcrumbs items={breadcrumbsItems} />
      {productMapper(product)}
    </div>
  );
}
