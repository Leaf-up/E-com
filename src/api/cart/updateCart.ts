import type { TCart, TCartUpdateAction } from './types';
import { API_URL, PROJECT_KEY } from '~/api/constants';

const endpoint = `${API_URL}/${PROJECT_KEY}/carts`;

export default function updateCart(
  token: string,
  id: string,
  version: number,
  actions: TCartUpdateAction[],
): Promise<{ cart: TCart | null; error: string | null }> {
  const info: { status: number; error?: string } = { status: 500 };
  const requestBody = {
    version,
    actions,
  };
  return fetch(`${endpoint}/${id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
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
        console.error(data.errors);
        return { cart: null, error: `(${info.status}) ${data.message ?? info.error}` };
      }
      return { cart: data as TCart, error: null };
    })
    .catch((error) => ({
      cart: null,
      error: `(${info.status}) ${error instanceof Error ? error.message : info.error}`,
    }));
}
