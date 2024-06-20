import type { TCartPromo } from './types';
import tokenHolder from '~/api/token/token';
import getPromo from './getPromo';

function requestPromo(): Promise<{ results: TCartPromo[] | null; error: string | null }> {
  return tokenHolder.get().then((bearer) => {
    if (bearer.error) return { results: null, error: bearer.error };
    const token = bearer.data!.access_token;
    return getPromo(token).then((response) => {
      return response;
    });
  });
}

class Promo {
  private holder: TCartPromo[] | null = null;

  public get(): Promise<TCartPromo[]> {
    return new Promise((resolve) => {
      if (this.holder) {
        resolve(this.holder);
        return;
      }
      requestPromo().then((response) => {
        this.holder = response.results;
        resolve(this.holder ?? []);
      });
    });
  }
}

const promoHolder = new Promo();
export default promoHolder;
