import { API_URL, PROJECT_KEY } from '~/api/constants';
import getCategory from '~/api/products/getCategory';
import { TCategory } from '~/api/products/types';

const endpoint = `${API_URL}/${PROJECT_KEY}/categories`;
const testToken = 'Og==';

const categoryData: TCategory[] = [
  {
    id: '3eba77cc-c083-414d-a329-dcbd53d39cdd',
    version: 1,
    createdAt: '2024-05-26T13:53:03.247Z',
    lastModifiedAt: '2024-05-26T13:53:03.247Z',
    key: 'positive',
    name: {
      'en-US': 'Positive effect',
    },
    slug: {
      'en-US': 'positive-effect',
    },
    ancestors: [
      {
        id: '3eba77cc-c083-414d-a329-dcbd53d39cdd',
        typeId: 'category',
      },
    ],
    orderHint: '0',
  },
];

const testSuccessResponse = { results: categoryData };
const testErrorResponse = { message: 'Error' };
const testFetchOptions = {
  headers: { Authorization: `Bearer ${testToken}`, 'Content-Type': 'application/json' },
  method: 'GET',
};

const expectedSuccessReturnResponse = {
  data: categoryData,
  error: null,
};
const expectedFailReturnResponse = {
  data: [],
  error: `(400) Error`,
};

const assetsSuccessFetchMock = () =>
  Promise.resolve({
    status: 200,
    headers: new Headers({
      'content-type': 'application/json',
    }),
    json: async () => testSuccessResponse,
  } as Response);

const assetsFailFetchMock = () =>
  Promise.resolve({
    status: 400,
    headers: new Headers({
      'content-type': 'application/json',
    }),
    json: async () => testErrorResponse,
  } as Response);

describe('Get products api:', () => {
  const fetchMock = jest
    .spyOn(global, 'fetch')
    .mockImplementationOnce(assetsSuccessFetchMock)
    .mockImplementationOnce(assetsFailFetchMock);

  test('Receive expected successful response', async () => {
    const response = await getCategory(testToken);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(endpoint, testFetchOptions);
    expect(response).toEqual(expectedSuccessReturnResponse);
  });

  test('Receive expected fail response', async () => {
    const response = await getCategory(testToken);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(endpoint, testFetchOptions);
    expect(response).toEqual(expectedFailReturnResponse);
  });
});
