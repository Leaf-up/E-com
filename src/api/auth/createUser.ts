import type { TRegisterData } from './types';
import type { TCustomer } from '~/api/types';
import { API_URL, PROJECT_KEY } from '~/api/constants';

const endpoint = `${API_URL}/${PROJECT_KEY}/customers`;

export default function createCustomer(
  registerData: TRegisterData,
  token: string,
): Promise<{ customer: TCustomer | null; error: string | null }> {
  const info: { status: number; error?: string } = { status: 500 };
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerData),
  })
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
        return { customer: null, error: `(${info.status}) ${data.message ?? info.error}` };
      }
      const { customer } = data as { customer: TCustomer };
      return { customer, error: null };
    })
    .catch((error) => ({
      customer: null,
      error: `(${info.status}) ${error instanceof Error ? error.message : info.error}`,
    }));
}
