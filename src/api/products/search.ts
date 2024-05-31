import type { TProduct } from './types';
import getSearch from './getSearch';
import tokenHolder from '~/api/token/token';
import { productsStore } from '~/entities';

export default function search(
  keyword?: string,
  sort?: string[],
): Promise<{ data: TProduct[] | null; error: string | null }> {
  return tokenHolder.get().then((bearer) => {
    if (bearer.error) return { data: null, error: bearer.error };
    const token = bearer.data!.access_token;
    return getSearch(token, keyword, sort).then((response) => {
      if (response.data) {
        productsStore.products = response.data;
      }
      return response;
    });
  });
}
