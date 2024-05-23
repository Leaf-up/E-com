import type { TTokenResponse } from './types';
import getToken from './getToken';

class Token {
  private holder: TTokenResponse | null = null;

  public get(): Promise<TTokenResponse> {
    return new Promise((resolve) => {
      if (this.holder) {
        resolve(this.holder);
        return;
      }
      getToken().then((response) => {
        this.holder = response;
        resolve(this.holder);
      });
    });
  }
}

const tokenHolder = new Token();
export default tokenHolder;
