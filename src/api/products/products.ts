import type { TRawProduct } from './types';
import getProducts from './getProducts';
import tokenHolder from '~/api/token/token';

export default function requestProducts(key?: string): Promise<{ data: TRawProduct[] | null; error: string | null }> {
  return tokenHolder.get().then((bearer) => {
    if (bearer.error) return { data: null, error: bearer.error };
    const token = bearer.data!.access_token;
    return getProducts(token, key).then((response) => {
      return response;
    });
  });
}
