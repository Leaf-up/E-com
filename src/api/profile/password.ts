import type { TCustomer } from '~/api/types';
import { customerStore } from '~/entities';
import tokenHolder from '~/api/token/token';
import changePassword from './changePassword';

export default function performChangePassword(
  customer: TCustomer,
  currentPassword: string,
  newPassword: string,
): Promise<{ customer: TCustomer | null; error: string | null }> {
  return tokenHolder.get().then((bearer) => {
    if (bearer.error) return { customer: null, error: bearer.error };
    const token = bearer.data!.access_token;
    return changePassword(customer.id, customer.version, currentPassword, newPassword, token).then((response) => {
      if (response.customer) customerStore.user = response.customer;
      return response;
    });
  });
}
