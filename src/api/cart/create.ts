import type { TCart } from './types';
import { customerStore } from '~/entities';
import tokenHolder from '~/api/token/token';
import createCart from './createCart';

export default function prepareCart(customerId?: string): Promise<{ cart: TCart | null; error: string | null }> {
  return tokenHolder.get().then((bearer) => {
    if (bearer.error) return { cart: null, error: bearer.error };
    const token = bearer.data!.access_token;
    return createCart(token, customerId).then((response) => {
      if (response.cart) {
        customerStore.cart = response.cart;
      }
      return response;
    });
  });
}
