import type { TCredentials, TCustomer } from './types';
import { getToken } from './token';

const API_URL = import.meta.env.VITE_CTP_API_URL;
const PROJECT_KEY = import.meta.env.VITE_CTP_PROJECT_KEY;
const endpoint = `${API_URL}/${PROJECT_KEY}/login`;

function getUserData(
  credentials: TCredentials,
  token: string,
): Promise<{ customer: TCustomer | null; error: string | null }> {
  const info: { status: number; error?: string } = { status: 500 };
  const body = JSON.stringify({
    email: credentials.email,
    password: credentials.password,
  });
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  return fetch(endpoint, { method: 'POST', headers, body })
    .then((response) => {
      info.status = response.status;
      if (~~(response.status / 100) !== 2) {
        info.error = response.statusText;
      }
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(info.error || 'Havent got a JSON');
      }
      return response.json();
    })
    .then((data) => {
      if (info.status !== 200) return { customer: null, error: `(${info.status}) ${data.message ?? info.error}` };
      const { customer } = data as { customer: TCustomer };
      return { customer, error: null };
    })
    .catch((error) => ({
      customer: null,
      error: `(${info.status}) ${error instanceof Error ? error.message : info.error}`,
    }));
}

export default function performLogin(
  credentials: TCredentials,
): Promise<{ customer: TCustomer | null; error: string | null }> {
  return getToken().then((bearer) => {
    if (bearer.error) return { customer: null, error: bearer.error };
    const token = bearer.data!.access_token;
    return getUserData(credentials, token).then((user) => {
      return user;
    });
  });
}