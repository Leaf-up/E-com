import type { TDiscount } from './types';
import getDiscount from './getDiscount';
import tokenHolder from '~/api/token/token';

export default function requestDiscount(): Promise<{ data: TDiscount[] | null; error: string | null }> {
  return tokenHolder.get().then((bearer) => {
    if (bearer.error) return { data: null, error: bearer.error };
    const token = bearer.data!.access_token;
    return getDiscount(token).then((response) => {
      if (response.data) {
        console.log(response.data);
      }
      return response;
    });
  });
}
