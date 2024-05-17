import type { TRegisterData, TCustomer } from './types';
import { customerStore } from '~/entities';
import getToken from './token';
import createCustomer from './createUser';

export default function performRegister(
  registerData: TRegisterData,
): Promise<{ customer: TCustomer | null; error: string | null }> {
  return getToken().then((bearer) => {
    if (bearer.error) return { customer: null, error: bearer.error };
    const token = bearer.data!.access_token;
    return createCustomer(registerData, token).then((response) => {
      if (response.customer) customerStore.user = response.customer;
      return response;
    });
  });
}
