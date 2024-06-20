import type { TProduct } from '../products/types';

const endpoint = '/data/products.json';

export default function getLocalProducts(): Promise<TProduct[] | null> {
  return fetch(endpoint)
    .then((response) => {
      if (Math.floor(response.status / 100) !== 2) {
        throw new Error(response.statusText);
      }
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(response.statusText || 'Havent got a JSON');
      }
      return response.json();
    })
    .then((data) => {
      return data as TProduct[];
    })
    .catch(() => null);
}
