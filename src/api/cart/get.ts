import type { TCart } from './types';
import tokenHolder from '~/api/token/token';
import getCart from './getCart';
import findCart from './findCart';
import { customerStore } from '~/entities';

export default function requestCart(
  id: string,
  customerId?: string,
): Promise<{ cart: TCart | null; error: string | null }> {
  return tokenHolder.get().then((bearer) => {
    if (bearer.error) return { cart: null, error: bearer.error };
    const token = bearer.data!.access_token;
    if (customerId) {
      return findCart(token, customerId).then((response) => {
        console.log(response);
        if (response.cart) {
          customerStore.cart = response.cart;
        }
        return response;
      });
    } else {
      return getCart(token, id).then((response) => {
        if (response.cart) {
          customerStore.cart = response.cart;
        }
        return response;
      });
    }
  });
}
