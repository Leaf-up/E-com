import type { TProfileAction } from './types';
import type { TCustomer } from '~/api/types';
import { customerStore } from '~/entities';
import getToken from '~/api/token';
import updateCustomer from './updateUser';

export default function performProfileUpdate(
  customer: TCustomer,
  actions: TProfileAction[],
): Promise<{ customer: TCustomer | null; error: string | null }> {
  return getToken().then((bearer) => {
    if (bearer.error) return { customer: null, error: bearer.error };
    const token = bearer.data!.access_token;
    return updateCustomer(customer.id, customer.version, actions, token).then((response) => {
      if (response.customer) customerStore.user = response.customer;
      return response;
    });
  });
}
