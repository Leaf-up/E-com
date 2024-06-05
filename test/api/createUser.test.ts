import type { TRegisterData } from '~/api/auth/types';
import createCustomer from '~/api/auth/createUser';
import { API_URL, PROJECT_KEY } from '~/api/constants';

const endpoint = `${API_URL}/${PROJECT_KEY}/customers`;

const registerData: TRegisterData = {
  email: '2@2.ru',
  password: '123',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '01.01.2000',
  addresses: [
    {
      streetName: 'street',
      city: 'city',
      postalCode: '000000',
      country: 'country',
    },
  ],
  shippingAddresses: [1],
  billingAddresses: [1],
};
const testToken = 'Og==';
const testResponse = { customer: registerData };
const testFetchOptions = {
  headers: { Authorization: 'Bearer Og==', 'Content-Type': 'application/json' },
  method: 'POST',
  body: JSON.stringify(registerData),
};

const assetsFetchMock = () =>
  Promise.resolve({
    status: 200,
    headers: new Headers({
      'content-type': 'application/json',
    }),
    json: async () => testResponse,
  } as Response);

describe('Create user api:', () => {
  let fetchMock: jest.SpyInstance<Promise<Response>> | null = null;

  beforeEach(() => {
    fetchMock = jest.spyOn(global, 'fetch').mockImplementation(assetsFetchMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Receive expected user data', async () => {
    const response = await createCustomer(registerData, testToken);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(endpoint, testFetchOptions);
    expect(response.customer).toBe(testResponse.customer);
  });
});
