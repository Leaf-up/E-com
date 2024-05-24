import { useProducts } from '~/entities';
import { TProduct } from '~/api/products/types';
import { CardProduct } from '~/ui';
import styles from './catalog.module.css';

export default function Catalog() {
  const { products } = useProducts();

  const productMapper = (item: TProduct, i: number) => {
    const productData = item.masterData.published ? item.masterData.current : item.masterData.staged;
    const {
      name: { 'en-US': name },
      description: { 'en-US': description },
      masterVariant: { attributes, images, prices },
    } = productData;
    const price = prices && prices[0] ? prices[0].value.centAmount / 10 ** prices[0].value.fractionDigits : 0;
    const product = { name, description, attributes, images, price };
    return <CardProduct {...product} key={i} />;
  };

  return (
    <section aria-label="Catalog">
      <div className={styles.products}>
        {!products || (!products.length && <p>Catalog is empty</p>)}
        {products?.map(productMapper)}
      </div>
    </section>
  );
}
