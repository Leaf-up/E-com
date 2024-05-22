import type { TProfileAction } from '~/api/profile/types';
import { API_URL, PROJECT_KEY } from '~/api/constants';
import updateCustomer from '~/api/profile/updateUser';

const userId = 'userId';
const version = 1;
const endpoint = `${API_URL}/${PROJECT_KEY}/customers/${userId}`;

const address = {
  streetName: 'Any Street',
  postalCode: '11111',
  city: 'Any City',
  country: 'US',
};

const actions: TProfileAction[] = [
  {
    action: 'removeAddress',
    addressId: 'addressId',
  },
  {
    action: 'addAddress',
    address,
  },
  {
    action: 'setDefaultBillingAddress',
    addressId: 'addressId',
  },
];
const testToken = 'Og==';

const testResponse = { address };
const testFetchOptions = {
  headers: { Authorization: 'Bearer Og==', 'Content-Type': 'application/json' },
  method: 'POST',
  body: JSON.stringify({ version, actions }),
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
    const response = await updateCustomer(userId, version, actions, testToken);
    console.log(response);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(endpoint, testFetchOptions);
    expect(response.customer).toBe(testResponse);
  });
});
