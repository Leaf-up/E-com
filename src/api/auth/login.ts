import type { TCredentials } from './types';
import type { TCustomer } from '~/api/types';
import { customerStore } from '~/entities';
import tokenHolder from '~/api/token/token';
import getUserData from './getUser';

export default function performLogin(
  credentials: TCredentials,
): Promise<{ customer: TCustomer | null; error: string | null }> {
  return tokenHolder.get().then((bearer) => {
    if (bearer.error) return { customer: null, error: bearer.error };
    const token = bearer.data!.access_token;
    return getUserData(credentials, token).then((response) => {
      if (response.customer) {
        customerStore.user = response.customer;
      }
      return response;
    });
  });
}
