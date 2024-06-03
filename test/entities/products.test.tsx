/**
 * @jest-environment jsdom
 */

// jest.mock('~/api', () => jest.fn());
import { productsStore } from '~/entities';
import type { TProduct, TDiscount } from '~/api/products/types.ts';

jest.mock('~/pages', () => ({
  ...jest.requireActual('~/pages/404/404'),
}));
jest.mock('~/api', () => ({
  requestProducts: jest.fn(() => Promise.resolve({})),
}));
jest.mock('~/entities/customer/customer', () => ({
  useCustomer: jest.fn(() => ({ user: {} })),
  customerStore: {},
}));
jest.mock('~/entities/products/products', () => jest.fn());
jest.mock('~/api/profile/updateUser', () => jest.fn());
jest.mock('~/api/profile/changePassword', () => jest.fn());
jest.mock('~/widgets/message/message', () => jest.fn());

const productsMock: TProduct[] = [
  {
    name: { 'en-US': 'name' },
    categories: [
      {
        id: 'categoryid',
        typeId: 'category',
      },
    ],
    slug: {
      'en-US': 'slug',
    },
    description: { 'en-US': 'description' },
    masterVariant: {
      id: 1,
      key: 'key',
      sku: 'sku',
      prices: [
        {
          id: 'priceid',
          value: {
            centAmount: 100,
            currencyCode: 'USD',
            type: 'centPrecision',
            fractionDigits: 2,
          },
          discounted: {
            value: {
              centAmount: 100,
              currencyCode: 'USD',
              type: 'centPrecision',
              fractionDigits: 2,
            },
            discount: {
              id: 'discountid',
              typeId: 'product-discount',
            },
          },
        },
      ],
      attributes: [
        {
          name: 'attributename1',
          value: 'value',
        },
        {
          name: 'attributename2',
          value: { key: 'key', label: 'label' },
        },
      ],
      images: [
        {
          url: 'url',
          dimensions: { w: 100, h: 200 },
          label: 'label',
        },
      ],
    },
    variants: [
      {
        id: 1,
        key: 'key',
        sku: 'sku',
        prices: [
          {
            id: 'priceid',
            value: {
              centAmount: 100,
              currencyCode: 'USD',
              type: 'centPrecision',
              fractionDigits: 2,
            },
            discounted: {
              value: {
                centAmount: 100,
                currencyCode: 'USD',
                type: 'centPrecision',
                fractionDigits: 2,
              },
              discount: {
                id: 'discountid',
                typeId: 'product-discount',
              },
            },
          },
        ],
        attributes: [
          {
            name: 'attributename1',
            value: 'value',
          },
          {
            name: 'attributename2',
            value: { key: 'key', label: 'label' },
          },
        ],
        images: [
          {
            url: 'url',
            dimensions: { w: 100, h: 200 },
            label: 'label',
          },
        ],
      },
    ],
    searchKeywords: {
      'en-US': [{ text: 'searchKeyword' }],
    },

    id: 'id',
    version: 1,
    key: 'key',
    productType: {
      id: 'productTypeid',
      typeId: 'product-type',
    },
    published: true,
    taxCategory: {
      id: 'taxCategoryid',
      typeId: 'tax-category',
    },
  },
];

const categoryMock: Record<string, string> = { key1: 'value', key2: 'value' };

const discountMock: TDiscount[] = [
  {
    id: 'id',
    version: 1,
    name: { 'en-US': 'name' },
    value: {
      type: 'relative',
      permyriad: 1,
      money: [
        {
          type: 'centPrecision',
          fractionDigits: 1,
          currencyCode: 'currencyCode',
          centAmount: 2,
        },
      ],
    },
    predicate: 'predicate',
    sortOrder: 'sortOrder',
    isActive: true,
    references: [
      {
        typeId: 'product',
        id: 'referenceid',
      },
    ],
    createdAt: 'createdAt',
    lastModifiedAt: 'lastModifiedAt',
  },
];

describe('ProductsStore:', () => {
  test('Products', () => {
    productsStore.products = productsMock;
    expect(productsStore.products).toBe(productsMock);
  });

  test('Category', () => {
    productsStore.category = categoryMock;
    expect(productsStore.category).toBe(categoryMock);
  });

  test('Discount', () => {
    productsStore.discount = discountMock;
    expect(productsStore.discount).toBe(discountMock);
  });
});
