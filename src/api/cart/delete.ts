import type { TCart } from './types';
import tokenHolder from '~/api/token/token';
import deleteCart from './deleteCart';
import { customerStore } from '~/entities';

export default function clearCart(id: string, version: number): Promise<{ cart: TCart | null; error: string | null }> {
  return tokenHolder.get().then((bearer) => {
    if (bearer.error) return { cart: null, error: bearer.error };
    const token = bearer.data!.access_token;
    return deleteCart(token, id, version).then((response) => {
      if (response.cart) {
        customerStore.cart = null;
      }
      return response;
    });
  });
}
