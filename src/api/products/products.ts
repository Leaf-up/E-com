import type { TProduct } from './types';
import getProducts from './getProducts';
import tokenHolder from '~/api/token/token';

export default function requestProducts(): Promise<{ data: TProduct[] | null; error: string | null }> {
  return tokenHolder.get().then((bearer) => {
    if (bearer.error) return { data: null, error: bearer.error };
    const token = bearer.data!.access_token;
    return getProducts(token).then((response) => {
      if (response.data) {
        console.log(response.data);
      }
      return response;
    });
  });
}
