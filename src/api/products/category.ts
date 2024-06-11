import type { TCategory } from './types';
import getCategory from './getCategory';
import tokenHolder from '~/api/token/token';

export default function requestCategory(): Promise<{ data: TCategory[] | null; error: string | null }> {
  return tokenHolder.get().then((bearer) => {
    if (bearer.error) return { data: null, error: bearer.error };
    const token = bearer.data!.access_token;
    return getCategory(token).then((response) => {
      if (response.data) {
        // console.log('Category:', response.data);
      }
      return response;
    });
  });
}
