import type { TProductImage, TProductAttribute } from '~/api/products/types';

export type TCardProductProps = {
  id: string;
  name: string;
  description: string;
  attributes?: TProductAttribute[];
  images: TProductImage[];
  price: number;
  discounted: number | null;
  category: string | null;
  rating?: number;
};
