import type { TProductImage, TProductAttribute } from '~/api/products/types';

export type TCardProductProps = {
  name: string;
  description: string;
  attributes?: TProductAttribute[];
  images: TProductImage[];
  price: number;
  link: string;
};
