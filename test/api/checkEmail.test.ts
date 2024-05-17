import checkEmail from '~/api/auth/checkEmail';
import { API_URL, PROJECT_KEY } from '~/api/constants';

const testEmail = '2@2.ru';
const searchParam = encodeURIComponent(`email="${testEmail}"`);
const endpoint = `${API_URL}/${PROJECT_KEY}/customers?where=${searchParam}`;
const testToken = 'Og==';
const testResponse = { results: [{ email: '2@2.ru' }] };
const testFetchOptions = {
  headers: { Authorization: 'Bearer Og==', 'Content-Type': 'application/json' },
  method: 'GET',
};

const assetsFetchMock = () =>
  Promise.resolve({
    status: 200,
    headers: new Headers({
      'content-type': 'application/json',
    }),
    json: async () => testResponse,
  } as Response);

describe('Check email api:', () => {
  let fetchMock: jest.SpyInstance<Promise<Response>> | null = null;

  beforeEach(() => {
    fetchMock = jest.spyOn(global, 'fetch').mockImplementation(assetsFetchMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Receive expected email search results', async () => {
    const response = await checkEmail(testEmail, testToken);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(endpoint, testFetchOptions);
    expect(response.results).toBe(testResponse.results);
  });
});
