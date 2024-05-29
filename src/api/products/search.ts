import type { TProduct } from './types';
import getSearch from './getSearch';
import tokenHolder from '~/api/token/token';

export default function search(keyword: string): Promise<{ data: TProduct[] | null; error: string | null }> {
  return tokenHolder.get().then((bearer) => {
    if (bearer.error) return { data: null, error: bearer.error };
    const token = bearer.data!.access_token;
    return getSearch(keyword, token).then((response) => {
      if (response.data) {
        // console.log('Products:', response.data);
      }
      return response;
    });
  });
}
