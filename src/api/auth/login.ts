import type { TCredentials, TCustomer } from './types';
import { customerStore } from '~/entities';
import getToken from './token';
import checkEmail from './checkEmail';
import getUserData from './getUser';

export default function performLogin(
  credentials: TCredentials,
): Promise<{ customer: TCustomer | null; error: string | null }> {
  return getToken().then((bearer) => {
    if (bearer.error) return { customer: null, error: bearer.error };
    const token = bearer.data!.access_token;
    return getUserData(credentials, token).then((response) => {
      if (response.customer) {
        customerStore.user = response.customer;
        return response;
      }
      return checkEmail(credentials.email, token).then((check) => {
        const error = !check.results.length
          ? `User with ${credentials.email} email was not found`
          : 'Password is wrong';
        return { customer: null, error };
      });
    });
  });
}
