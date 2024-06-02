import { API_URL, PROJECT_KEY } from '~/api/constants';
import getSearch from '~/api/products/getSearch';
import { TRawProduct } from '~/api/products/types';

const keyword = 'test';
const endpoint = `${API_URL}/${PROJECT_KEY}/product-projections/search?staged=true&fuzzy=true&text.en-US="${keyword}"`;
const testToken = 'Og==';

const discountData: TRawProduct[] = [
  {
    id: '0604355f-120f-4fd0-8b9f-242df083a833',
    version: 1,
    createdAt: '2024-05-03T15:02:25.264Z',
    productType: {
      typeId: 'product-type',
      id: '5e03ec10-b054-4192-b0ab-55c25303bb26',
    },
    masterData: {
      current: {
        name: {
          'en-US': 'Growth cabbage',
        },
        description: {
          'en-US':
            'It grows in bushes with small cabbages (about 5cm in diameter).\nThe vegetables have a sweetish taste, and in contrast to their small size,- when consumed accelerate growth.',
        },
        categories: [
          {
            typeId: 'category',
            id: '3eba77cc-c083-414d-a329-dcbd53d39cdd',
          },
        ],
        masterVariant: {
          id: 1,
          sku: 'SC-01-1',
          prices: [
            {
              id: 'd0e4b98e-a821-444a-9d61-f40e251264bd',
              value: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 2200,
                fractionDigits: 2,
              },
            },
          ],
          images: [
            {
              url: 'https://raw.githubusercontent.com/Leaf-up/idea/main/product/cabbage.webp',
              label: 'cabbage',
              dimensions: {
                w: 256,
                h: 256,
              },
            },
          ],
          attributes: [
            {
              name: 'weight',
              value: '3g',
            },
          ],
        },
        variants: [
          {
            id: 2,
            sku: 'SC-01-2',
            prices: [
              {
                id: '704f2b30-3983-4208-8cec-b973dcc29151',
                value: {
                  type: 'centPrecision',
                  currencyCode: 'USD',
                  centAmount: 3500,
                  fractionDigits: 2,
                },
              },
            ],
            images: [
              {
                url: 'https://raw.githubusercontent.com/Leaf-up/idea/main/product/cabbage.webp',
                label: 'cabbage',
                dimensions: {
                  w: 256,
                  h: 256,
                },
              },
            ],
            attributes: [
              {
                name: 'weight',
                value: '5g',
              },
            ],
          },
        ],
        slug: {
          'en-US': 'cabbage',
        },
      },
      staged: {
        name: {
          'en-US': 'Growth cabbage',
        },
        description: {
          'en-US':
            'It grows in bushes with small cabbages (about 5cm in diameter).\nThe vegetables have a sweetish taste, and in contrast to their small size,- when consumed accelerate growth.',
        },
        categories: [
          {
            typeId: 'category',
            id: '3eba77cc-c083-414d-a329-dcbd53d39cdd',
          },
        ],
        masterVariant: {
          id: 1,
          sku: 'SC-01-1',
          prices: [
            {
              id: 'd0e4b98e-a821-444a-9d61-f40e251264bd',
              value: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 2200,
                fractionDigits: 2,
              },
            },
          ],
          images: [
            {
              url: 'https://raw.githubusercontent.com/Leaf-up/idea/main/product/cabbage1.webp',
              label: 'cabbage',
              dimensions: {
                w: 512,
                h: 512,
              },
            },
          ],
          attributes: [
            {
              name: 'weight',
              value: '3g',
            },
          ],
        },
        variants: [
          {
            id: 2,
            images: [
              {
                url: 'https://raw.githubusercontent.com/Leaf-up/idea/main/product/cabbage1.webp',
                label: 'cabbage',
                dimensions: {
                  w: 512,
                  h: 512,
                },
              },
            ],
            attributes: [
              {
                name: 'weight',
                value: '5g',
              },
            ],
          },
        ],
        slug: {
          'en-US': 'cabbage',
        },
      },
      published: false,
      hasStagedChanges: true,
    },
  },
];

const testSuccessResponse = { results: discountData, total: 1 };
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
  data: null,
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

describe('Get search api:', () => {
  const fetchMock = jest
    .spyOn(global, 'fetch')
    .mockImplementationOnce(assetsSuccessFetchMock)
    .mockImplementationOnce(assetsFailFetchMock);

  test('Receive expected successful response', async () => {
    const response = await getSearch(testToken, keyword);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(endpoint, testFetchOptions);
    expect(response).toEqual(expectedSuccessReturnResponse);
  });

  test('Receive expected fail response', async () => {
    const response = await getSearch(testToken, keyword);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(endpoint, testFetchOptions);
    expect(response).toEqual(expectedFailReturnResponse);
  });
});
