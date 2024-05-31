import type { TProduct } from './types';
import { API_URL, PROJECT_KEY } from '~/api/constants';

const endpoint = `${API_URL}/${PROJECT_KEY}/product-projections`;

export default function getSearch(
  token: string,
  keyword?: string,
  sort?: string[],
): Promise<{ data: TProduct[] | null; error: string | null }> {
  const info: { status: number; error?: string } = { status: 500 };
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  let url = `${endpoint}/search?staged=true&fuzzy=true`;
  if (keyword) url = `${url}&text.en-US="${keyword}"`;
  if (sort) sort.forEach((param) => (url = `${url}&sort=${param}`));

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
