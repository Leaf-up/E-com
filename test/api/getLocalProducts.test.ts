import { getLocalProducts } from '~/api';
import { TProduct } from '~/api/products/types';

jest.mock('~/entities/customer/customer', () => ({ useCustomer: jest.fn(() => ({ user: {} })) }));
jest.mock('~/entities/products/products', () => jest.fn());

const endpoint = '/data/products.json';

const productData: TProduct[] = [
  {
    id: '0604355f-120f-4fd0-8b9f-242df083a833',
    version: 1,
    productType: {
      typeId: 'product-type',
      id: '5e03ec10-b054-4192-b0ab-55c25303bb26',
    },
    published: false,
    slug: {
      'en-US': '',
    },
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
  },
];

const testSuccessResponse = productData;
const testErrorResponse = { message: 'Error' };

const expectedSuccessReturnResponse = productData;
const expectedFailReturnResponse = null;

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

describe('Get local product api:', () => {
  const fetchMock = jest
    .spyOn(global, 'fetch')
    .mockImplementationOnce(assetsSuccessFetchMock)
    .mockImplementationOnce(assetsFailFetchMock);

  test('Receive expected successful response', async () => {
    const response = await getLocalProducts();

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(endpoint);
    expect(response).toEqual(expectedSuccessReturnResponse);
  });

  test('Receive expected fail response', async () => {
    const response = await getLocalProducts();

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(endpoint);
    expect(response).toEqual(expectedFailReturnResponse);
  });
});
