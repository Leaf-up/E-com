import getUserData from '~/api/auth/getUser';
import { API_URL, PROJECT_KEY } from '~/api/constants';

const endpoint = `${API_URL}/${PROJECT_KEY}/login`;
const credentials = { email: '2@2.ru', password: '123' };
const testToken = 'Og==';
const testResponse = { customer: [{ email: '2@2.ru' }] };
const testFetchOptions = {
  headers: { Authorization: 'Bearer Og==', 'Content-Type': 'application/json' },
  method: 'POST',
  body: JSON.stringify({
    email: credentials.email,
    password: credentials.password,
  }),
};

const assetsFetchMock = () =>
  Promise.resolve({
    status: 200,
    headers: new Headers({
      'content-type': 'application/json',
    }),
    json: async () => testResponse,
  } as Response);

describe('Get user api:', () => {
  let fetchMock: jest.SpyInstance<Promise<Response>> | null = null;

  beforeEach(() => {
    fetchMock = jest.spyOn(global, 'fetch').mockImplementation(assetsFetchMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Receive expected user data', async () => {
    const response = await getUserData(credentials, testToken);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(endpoint, testFetchOptions);
    expect(response.customer).toBe(testResponse.customer);
  });
});
