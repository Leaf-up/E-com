import type { TProduct } from './types';
import type { TFilterData } from '../types';
import { API_URL, PROJECT_KEY } from '~/api/constants';

const endpoint = `${API_URL}/${PROJECT_KEY}/product-projections`;

export default function setFilters(
  token: string,
  filters?: TFilterData,
  offset = 0,
): Promise<{ data: TProduct[] | null; error: string | null; total?: number }> {
  const info: { status: number; error?: string } = { status: 500 };
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  let url = `${endpoint}/search?staged=true&limit=10&offset=${offset}`;
  if (filters) {
    if (filters.keyword) url = `${url}&text.en-US="${filters.keyword}"`;
    if (filters.sorting) url = `${url}&sort=${filters.sorting}`;
    url = `${url}&filter=variants.price.centAmount:range (${filters.priceMin * 100} to ${filters.priceMax * 100})`;
    const weight = Array.from(
      { length: filters.weightMax - filters.weightMin + 1 },
      (_, i) => `%22${i + filters.weightMin}g%22`,
    ).join('%2C');
    url = `${url}&filter=variants.attributes.weight%3A${weight}`;
    if (filters.brand) url = `${url}&filter=variants.attributes.brand%3A%22${filters.brand}%22`;
    if (filters.color) url = `${url}&filter=variants.attributes.color.key%3A%22${filters.color}%22`;
    if (filters.size) url = `${url}&filter=variants.attributes.size.key%3A%22${filters.size}%22`;
    if (filters.charm) url = `${url}&filter=variants.attributes.charm%3A${filters.charm}`;
  }

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
        return { data: null, error: `(${info.status}) ${data.message ?? info.error}` };
      }
      const { results, total } = data as { results: TProduct[]; total: number };
      return { data: results, total, error: null };
    })
    .catch((error) => ({
      data: null,
      error: `(${info.status}) ${error instanceof Error ? error.message : info.error}`,
    }));
}
