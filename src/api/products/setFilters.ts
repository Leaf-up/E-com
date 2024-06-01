import type { TProduct } from './types';
import type { TFilterData } from '../types';
import { API_URL, PROJECT_KEY } from '~/api/constants';

const endpoint = `${API_URL}/${PROJECT_KEY}/product-projections`;

export default function setFilters(
  token: string,
  filters: TFilterData,
): Promise<{ data: TProduct[] | null; error: string | null }> {
  const info: { status: number; error?: string } = { status: 500 };
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  let url = `${endpoint}/search?staged=true&filter=variants.price.centAmount:range (${filters.priceMin} to ${filters.priceMax * 100})`;
  const weight = Array.from(
    { length: filters.weightMax - filters.weightMin },
    (_, i) => `%22${i + filters.weightMin}g%22`,
  ).join('%2C');
  url = `${url}&filter=variants.attributes.weight%3A${weight}`; // array
  if (filters.brand) url = `${url}&filter=variants.attributes.brand%3A%22${filters.brand}%22`; // string
  if (filters.color) url = `${url}&filter=variants.attributes.color.key%3A%22${filters.color}%22`; // enum
  if (filters.size) url = `${url}&filter=variants.attributes.size.key%3A%22${filters.size}%22`; // enum
  if (filters.charm) url = `${url}&filter=variants.attributes.charm%3A${filters.charm}`; // boolean

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
        // console.error(data.errors);
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
