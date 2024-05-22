import { AUTH_URL } from '~/api/constants';
import getToken from '~/api/token';

const endpoint = `${AUTH_URL}/oauth/token`;

const testResponse = {
  access_token: 'token',
  token_type: 'Bearer',
  expires_in: 172800,
  scope: 'manage_project:e-com1234',
};

const testFetchOptions = {
  body: 'grant_type=client_credentials',
  headers: { Authorization: 'Basic Og==', 'Content-Type': 'application/x-www-form-urlencoded' },
  method: 'POST',
};

const assetsFetchMock = () =>
  Promise.resolve({
    ok: true,
    status: 200,
    headers: new Headers({
      'content-type': 'application/json',
    }),
    json: async () => testResponse,
  } as Response);

describe('Token api:', () => {
  let fetchMock: jest.SpyInstance<Promise<Response>> | null = null;

  beforeEach(() => {
    fetchMock = jest.spyOn(global, 'fetch').mockImplementation(assetsFetchMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Receive expected token', async () => {
    const response = await getToken();

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(endpoint, testFetchOptions);
    expect(response.data).toBe(testResponse);
  });
});
