import { productsStore } from '~/entities/products/products';
import type { TProduct, TDiscount } from '~/api/products/types.ts';

jest.mock('mobx', () => ({
  makeAutoObservable: jest.fn(() => undefined),
  reaction: jest.fn(() => undefined),
  runInAction: jest.fn(() => undefined),
}));
jest.mock('~/api', () => ({
  filter: jest.fn(() => Promise.resolve({})),
  requestCategory: jest.fn(() => Promise.resolve({})),
  requestDiscount: jest.fn(() => Promise.resolve({})),
}));

const products: TProduct[] = [
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

const category: Record<string, string> = { key1: 'value', key2: 'value' };

const discount: TDiscount[] = [
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
    productsStore.products = products;
    expect(productsStore.products).toBe(products);
  });

  test('Category', () => {
    productsStore.category = category;
    expect(productsStore.category).toBe(category);
  });

  test('Discount', () => {
    productsStore.discount = discount;
    expect(productsStore.discount).toBe(discount);
  });
});
