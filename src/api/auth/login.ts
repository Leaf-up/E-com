import type { TCredentials, TUser } from './types';
import { getToken } from './token';

const API_URL = import.meta.env.VITE_CTP_API_URL;
const PROJECT_KEY = import.meta.env.VITE_CTP_PROJECT_KEY;
const endpoint = `${API_URL}/${PROJECT_KEY}/login`;

function getUserData(credentials: TCredentials, token: string): Promise<{ data?: TUser; error?: string }> {
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
        throw new Error(`(${info.status}) ${info.error ?? 'Havent got a JSON'}`);
      }
      return response.json();
    })
    .then((data) => {
      if (info.status !== 200) return { error: `(${info.status}) ${data.message ?? info.error}` };
      return { data } as { data: TUser };
    })
    .catch((error) => ({ error: `(${info.status}) ${error instanceof Error ? error.message : info.error}` }));
}

export default function performLogin(credentials: TCredentials): Promise<TUser | string> {
  return getToken().then((bearer) => {
    if (bearer.error) return bearer.error;
    const token = bearer.data!.access_token;
    return getUserData(credentials, token).then((user) => {
      if (user.error) return user.error;
      if (user.data) return user.data;
      return '(500) Unknown error';
    });
  });
}
