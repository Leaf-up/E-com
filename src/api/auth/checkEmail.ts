import type { TCustomer } from '~/api/types';
import { API_URL, PROJECT_KEY } from '~/api/constants';

const endpoint = `${API_URL}/${PROJECT_KEY}`;

export default function checkEmail(
  email: string,
  token: string,
): Promise<{ results: TCustomer[]; error: string | null }> {
  const info: { status: number; error?: string } = { status: 500 };
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  const searchParam = encodeURIComponent(`email="${email}"`);

  return fetch(`${endpoint}/customers?where=${searchParam}`, { method: 'GET', headers })
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
      if (info.status !== 200) return { results: [], error: `(${info.status}) ${data.message ?? info.error}` };
      const { results } = data as { results: TCustomer[] };
      return { results, error: null };
    })
    .catch((error) => ({
      results: [],
      error: `(${info.status}) ${error instanceof Error ? error.message : info.error}`,
    }));
}
