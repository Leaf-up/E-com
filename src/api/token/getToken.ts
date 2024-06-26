import type { TToken } from '~/api/types';
import type { TTokenResponse } from './types';
import { AUTH_URL } from '~/api/constants';

const CLIENT_ID = import.meta.env.VITE_CTP_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CTP_CLIENT_SECRET;
const clientToken = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

const endpoint = `${AUTH_URL}/oauth/token`;

export default function getToken(): Promise<TTokenResponse> {
  const info: { status: number; error?: string } = { status: 500 };
  const body = 'grant_type=client_credentials';
  const headers = {
    Authorization: `Basic ${clientToken}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  return fetch(endpoint, { method: 'POST', headers, body })
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
      if (info.status !== 200) return { error: `(${info.status}) ${data.message ?? info.error}` };
      return { data } as { data: TToken };
    })
    .catch((error) => ({ error: `(${info.status}) ${error instanceof Error ? error.message : info.error}` }));
}
