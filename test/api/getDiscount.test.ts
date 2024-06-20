import { API_URL, PROJECT_KEY } from '~/api/constants';
import getDiscount from '~/api/products/getDiscount';
import { TDiscount } from '~/api/products/types';

const endpoint = `${API_URL}/${PROJECT_KEY}/product-discounts`;
const testToken = 'Og==';

const discountData: TDiscount[] = [
  {
    id: 'd7a204f9-7746-4857-b17e-71f1235a691a',
    version: 1,
    value: {
      type: 'absolute',
      money: [
        {
          type: 'centPrecision',
          fractionDigits: 2,
          currencyCode: 'EUR',
          centAmount: 100,
        },
      ],
    },
    predicate: '1=1',
    name: {
      'en-US': 'test-discount1',
    },
    isActive: false,
    sortOrder: '0.9534',
    references: [],
    createdAt: '2016-02-24T09:44:57.858Z',
    lastModifiedAt: '2016-02-24T09:44:57.939Z',
  },
];

const testSuccessResponse = { results: discountData };
const testErrorResponse = { message: 'Error' };
const testFetchOptions = {
  headers: { Authorization: `Bearer ${testToken}`, 'Content-Type': 'application/json' },
  method: 'GET',
};

const expectedSuccessReturnResponse = {
  data: discountData,
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

describe('Get discount api:', () => {
  const fetchMock = jest
    .spyOn(global, 'fetch')
    .mockImplementationOnce(assetsSuccessFetchMock)
    .mockImplementationOnce(assetsFailFetchMock);

  test('Receive expected successful response', async () => {
    const response = await getDiscount(testToken);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(endpoint, testFetchOptions);
    expect(response).toEqual(expectedSuccessReturnResponse);
  });

  test('Receive expected fail response', async () => {
    const response = await getDiscount(testToken);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(endpoint, testFetchOptions);
    expect(response).toEqual(expectedFailReturnResponse);
  });
});
