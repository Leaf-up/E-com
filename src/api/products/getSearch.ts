import type { TProduct } from './types';
import { API_URL, PROJECT_KEY } from '~/api/constants';

const endpoint = `${API_URL}/${PROJECT_KEY}/product-projections`;

export default function getSearch(
  keyword: string,
  token: string,
): Promise<{ data: TProduct[] | null; error: string | null }> {
  const info: { status: number; error?: string } = { status: 500 };
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  // const searchParam = encodeURIComponent(`&text.en-US="${keyword}"`);
  const url = `${endpoint}/search?staged=true&fuzzy=true&limit=10&text.en-US="${keyword}"`;

  return fetch(url, { method: 'GET', headers })
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
        return { data: null, error: `(${info.status}) ${data.message ?? info.error}` };
      }
      const { results } = data as { results: TProduct[]; total: number };
      return { data: results, error: null };
    })
    .catch((error) => ({
      data: null,
      error: `(${info.status}) ${error instanceof Error ? error.message : info.error}`,
    }));
}
