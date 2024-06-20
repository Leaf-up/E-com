import type { TCart, TCartUpdateAction } from './types';
import tokenHolder from '~/api/token/token';
import updateCart from './updateCart';
import { customerStore } from '~/entities';

export default function changeCart(
  id: string,
  version: number,
  actions: TCartUpdateAction[],
): Promise<{ cart: TCart | null; error: string | null }> {
  return tokenHolder.get().then((bearer) => {
    if (bearer.error) return { cart: null, error: bearer.error };
    const token = bearer.data!.access_token;
    return updateCart(token, id, version, actions).then((response) => {
      if (response.cart) {
        console.log(response.cart);
        customerStore.cart = response.cart;
      }
      return response;
    });
  });
}
