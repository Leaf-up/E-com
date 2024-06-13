import type { TCart } from './types';
import tokenHolder from '~/api/token/token';
import getCart from './getCart';
import { customerStore } from '~/entities';

export default function requestCart(id: string): Promise<{ cart: TCart | null; error: string | null }> {
  return tokenHolder.get().then((bearer) => {
    if (bearer.error) return { cart: null, error: bearer.error };
    const token = bearer.data!.access_token;
    return getCart(token, id).then((response) => {
      if (response.cart) {
        customerStore.cart = response.cart;
      }
      return response;
    });
  });
}
