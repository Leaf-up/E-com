import type { TProduct } from './types';
import type { TFilterData } from '../types';
import setFilters from './setFilters';
import tokenHolder from '~/api/token/token';
import { productsStore } from '~/entities';

export default function filter(filters?: TFilterData): Promise<{ data: TProduct[] | null; error: string | null }> {
  return tokenHolder.get().then((bearer) => {
    if (bearer.error) return { data: null, error: bearer.error };
    const token = bearer.data!.access_token;
    return setFilters(token, filters).then((response) => {
      if (response.data) {
        productsStore.products = response.data;
      }
      return response;
    });
  });
}
