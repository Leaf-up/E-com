import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestProducts } from '~/api';
import { TProduct } from '~/api/products/types';
import { CardProduct } from '~/ui';

export default function Product() {
  const { category, key } = useParams();
  const [product, setProduct] = useState<TProduct | null>(null);

  const productMapper = (item: TProduct, i: number) => {
    const productData = item.masterData.published ? item.masterData.current : item.masterData.staged;
    const {
      name: { 'en-US': name },
      description: { 'en-US': description },
      masterVariant: { attributes, images, prices },
    } = productData;

    const price = prices && prices[0] ? prices[0].value.centAmount / 10 ** prices[0].value.fractionDigits : 0;
    const product = { name, description, attributes, images, price, link: '', category };
    return <CardProduct {...product} key={i} />;
  };

  useEffect(() => {
    requestProducts(key).then((response) => {
      if (response.error) console.log(response.error);
      if (response.data) setProduct(response.data[0]);
    });
  }, []);

  if (!product) return null;

  return productMapper(product, 0);
}
