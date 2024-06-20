import type { TDiscount } from './types';
import { API_URL, PROJECT_KEY } from '~/api/constants';

const endpoint = `${API_URL}/${PROJECT_KEY}`;

export default function getDiscount(token: string): Promise<{ data: TDiscount[]; error: string | null }> {
  const info: { status: number; error?: string } = { status: 500 };
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  return fetch(`${endpoint}/product-discounts`, { method: 'GET', headers })
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
      if (info.status !== 200) return { data: [], error: `(${info.status}) ${data.message ?? info.error}` };
      const { results } = data as { results: TDiscount[] };
      return { data: results, error: null };
    })
    .catch((error) => ({
      data: [],
      error: `(${info.status}) ${error instanceof Error ? error.message : info.error}`,
    }));
}
