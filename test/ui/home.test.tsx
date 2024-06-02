/**
 * @jest-environment jsdom
 */

import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { TProduct, TProductVariant } from '~/api/products/types';
import { Home } from '~/pages/home/home';

jest.mock('~/api', () => jest.fn());
jest.mock('~/entities', () => ({
  useProducts: jest.fn(() => ({
    products: [],
    category: {},
  })),
  productsLocal: {
    products: new Promise((resolve) => {
      const testProductMasterVariant: TProductVariant = {
        attributes: [
          {
            name: 'weight',
            value: '3g',
          },
          {
            name: 'brand',
            value: 'Happy witch',
          },
          {
            name: 'color',
            value: {
              key: '1',
              label: 'green',
            },
          },
          {
            name: 'size',
            value: {
              key: '0',
              label: 'S',
            },
          },
          {
            name: 'charm',
            value: 'false',
          },
        ],
        images: [
          {
            url: 'https://raw.githubusercontent.com/Leaf-up/idea/main/product/jujube1.webp',
            label: 'jujube',
            dimensions: {
              w: 512,
              h: 512,
            },
          },
          {
            url: 'https://raw.githubusercontent.com/Leaf-up/idea/main/product/jujube.webp',
            label: 'jujube',
            dimensions: {
              w: 256,
              h: 256,
            },
          },
        ],
        prices: [
          {
            id: '5ba6bbaa-57e2-4c4e-9940-879098bd058a',
            value: {
              type: 'centPrecision',
              centAmount: 5000,
              fractionDigits: 2,
              currencyCode: 'USD',
            },
          },
        ],
        sku: 'SC-07-1',
        id: 1,
      };

      const testProductVariant: TProductVariant = {
        id: 2,
        sku: 'SC-03-2',
        prices: [
          {
            id: 'c2983150-fd74-4411-8c8f-39afd487ab4e',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 4500,
              fractionDigits: 2,
            },
          },
        ],
        images: [
          {
            url: 'https://raw.githubusercontent.com/Leaf-up/idea/main/product/chia.webp',
            label: 'chia1',
            dimensions: {
              w: 256,
              h: 256,
            },
          },
        ],
        attributes: [
          {
            name: 'weight',
            value: '2g',
          },
          {
            name: 'brand',
            value: 'Happy witch',
          },
          {
            name: 'color',
            value: {
              key: 'red',
              label: 'red',
            },
          },
          {
            name: 'size',
            value: {
              key: 'S',
              label: 'S',
            },
          },
          {
            name: 'charm',
            value: 'true',
          },
        ],
      };

      const testProduct: TProduct = {
        id: 'ff5760eb-57fa-444f-af78-25137881bbca',
        version: 1,
        productType: {
          typeId: 'product-type',
          id: '5e03ec10-b054-4192-b0ab-55c25303bb26',
        },
        published: false,
        name: {
          'en-US': 'Attractive jujube',
        },
        description: {
          'en-US': 'The pulp of the fruit of this plant has an aphrodisiac effect.',
        },
        categories: [
          {
            typeId: 'category',
            id: '3eba77cc-c083-414d-a329-dcbd53d39cdd',
          },
          {
            typeId: 'category',
            id: '1c2a8f8e-01d8-4013-abc8-5877c825626a',
          },
        ],
        slug: {
          'en-US': 'attractive-jujube',
        },
        masterVariant: testProductMasterVariant,
        variants: [testProductVariant],
        key: 'attractive-jujube',
      };

      resolve([testProduct]);
    }),
  },
}));
jest.mock('~/widgets', () => ({
  Slider: jest.requireActual('~/widgets').Slider,
}));

it('DOM: home page:', async () => {
  const { asFragment, getByTestId } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>,
  );

  const sliderElement = await waitFor(() => getByTestId('slider'));
  expect(asFragment()).toBeTruthy();
  expect(sliderElement.children).toHaveLength(1);
});
