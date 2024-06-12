import type { TCartPromo } from './types';
import { API_URL, PROJECT_KEY } from '~/api/constants';

const endpoint = `${API_URL}/${PROJECT_KEY}/discount-codes`;

export default function getPromo(token: string): Promise<{ results: TCartPromo[]; error: string | null }> {
  const info: { status: number; error?: string } = { status: 500 };
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  return fetch(endpoint, { method: 'GET', headers })
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
      const { results } = data as { results: TCartPromo[] };
      return { results, error: null };
    })
    .catch((error) => ({
      results: [],
      error: `(${info.status}) ${error instanceof Error ? error.message : info.error}`,
    }));
}
