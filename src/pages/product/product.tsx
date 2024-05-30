import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestProducts } from '~/api';
import { TProduct } from '~/api/products/types';
import { Page404 } from '~/pages';
import { Loader, Breadcrumbs } from '~/ui';
import ProductInfo from './productInfo/productInfo';
import { CATEGORY_NAME, CATEGORY_SLUG } from '~/constants/constants';

import styles from './product.module.css';

export default function Product() {
  const { category, key } = useParams();
  const [product, setProduct] = useState<TProduct | null | '404'>(null);
  const categoryName = !category ? null : CATEGORY_NAME[CATEGORY_SLUG.indexOf(category)];

  const productMapper = (item: TProduct) => {
    const productData = item.masterData.published ? item.masterData.current : item.masterData.staged;
    const {
      name: { 'en-US': name },
      description: { 'en-US': description },
      masterVariant: { attributes, images, prices },
    } = productData;

    const price = prices && prices[0] ? prices[0].value.centAmount / 10 ** prices[0].value.fractionDigits : 0;
    const rating = Math.floor(Math.random() * 2) + 3;
    const props = { name, description, attributes, images, price, category: categoryName, rating };
    return <ProductInfo {...props} />;
  };

  useEffect(() => {
    requestProducts(key).then((response) => {
      if (response.error) setProduct('404');
      if (response.data) {
        if (!response.data.length) setProduct('404');
        else setProduct(response.data[0]);
      }
    });
  }, [category, key]);

  if (!product) return <Loader />;
  if (product === '404') return <Page404 />;

  const breadcrumbsItems = [
    { title: 'Home', link: '/' },
    { title: 'Catalog', link: '/catalog' },
  ];
  if (categoryName) {
    breadcrumbsItems.push(
      { title: categoryName, link: `/catalog/${category}` },
      { title: product.masterData.current.name['en-US'], link: `/catalog/${category}/${key}` },
    );
  } else {
    breadcrumbsItems.push({ title: product.masterData.current.name['en-US'], link: '' });
  }

  return (
    <div className={styles.product}>
      <Breadcrumbs items={breadcrumbsItems} />
      {productMapper(product)}
    </div>
  );
}
