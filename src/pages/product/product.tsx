import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Page404 } from '..';
import { requestProducts } from '~/api';
import { TProduct } from '~/api/products/types';
import ProductInfo from './productInfo/productInfo';
import { CATEGORY_NAME, CATEGORY_SLUG } from '~/constants/constants';

export default function Product() {
  const { category, key } = useParams();
  const [product, setProduct] = useState<TProduct | null | '404'>(null);

  const productMapper = (item: TProduct, i: number) => {
    const productData = item.masterData.published ? item.masterData.current : item.masterData.staged;
    const {
      name: { 'en-US': name },
      description: { 'en-US': description },
      masterVariant: { attributes, images, prices },
    } = productData;

    const categoryName = !category ? null : CATEGORY_NAME[CATEGORY_SLUG.indexOf(category)];
    const price = prices && prices[0] ? prices[0].value.centAmount / 10 ** prices[0].value.fractionDigits : 0;
    const rating = Math.floor(Math.random() * 2) + 3;
    const props = { name, description, attributes, images, price, category: categoryName, rating };
    return <ProductInfo {...props} key={i} />;
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

  if (!product) return null;
  if (product === '404') return <Page404 />;
  return productMapper(product, 0);
}
