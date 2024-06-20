import type { TCart } from './types';
import { API_URL, PROJECT_KEY } from '~/api/constants';

const endpoint = `${API_URL}/${PROJECT_KEY}/carts`;

export default function findCart(token: string, id: string): Promise<{ cart: TCart | null; error: string | null }> {
  const info: { status: number; error?: string } = { status: 500 };
  return fetch(`${endpoint}?customerId=${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      info.status = response.status;
      if (Math.floor(response.status / 100) !== 2) {
        info.error = response.statusText;
      }
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(info.error || 'Havent got a JSON');
      }
      return response.json();
    })
    .then((data) => {
      if (Math.floor(info.status / 100) !== 2) {
        return { cart: null, error: `(${info.status}) ${data.message ?? info.error}` };
      }
      return { cart: data as TCart, error: null };
    })
    .catch((error) => ({
      cart: null,
      error: `(${info.status}) ${error instanceof Error ? error.message : info.error}`,
    }));
}
