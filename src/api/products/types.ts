export type TRawProduct = {
  id: string;
  version: number;
  key?: string;
  productType: TProductTypeInfo;
  masterData: {
    published: boolean;
    current: TProductData;
    staged: TProductData;
    hasStagedChanges: boolean;
  };
  taxCategory?: TTaxCategory;
  priceMode?: 'Embedded' | 'Standalone';
  createdAt: string;
  lastModifiedAt?: string;
};

type TProductData = {
  name: { 'en-US': string };
  categories: TCategoryInfo[];
  slug: {
    'en-US': string;
  };
  description: { 'en-US': string };
  masterVariant: TProductVariant;
  variants: TProductVariant[];
  searchKeywords?: {
    'en-US': { text: string }[];
  };
};

export type TProduct = TProductData & {
  id: string;
  version: number;
  key?: string;
  productType: TProductTypeInfo;
  published: boolean;
  slug: { 'en-US': string };
  taxCategory?: TTaxCategory;
};

type TCategoryInfo = {
  id: string;
  typeId: 'category';
};

export type TCategory = {
  id: string;
  version: number;
  key?: string;
  name: { 'en-US': string };
  slug: { 'en-US': string };
  ancestors: TCategoryInfo[];
  parent?: TCategoryInfo;
  orderHint: string;
  createdAt: string;
  lastModifiedAt: string;
};

export type TProductVariant = {
  id: number;
  key?: string;
  sku?: string;
  prices: TPrice[];
  attributes?: TProductAttribute[];
  images: TProductImage[];
};

export type TPrice = {
  id: string;
  value: TMoney;
  discounted?: {
    value: TMoney;
    discount: TDiscountInfo;
  };
};

export type TMoney = {
  centAmount: number;
  currencyCode: TCurrencyCode;
  type: 'centPrecision' | 'highPrecision';
  fractionDigits: number;
};

export type TProductImage = {
  url: string;
  dimensions: { w: number; h: number };
  label?: string;
};

type TDiscountInfo = {
  id: string;
  typeId: 'product-discount';
};

export type TDiscount = {
  id: string;
  version: number;
  name: { 'en-US': string };
  value: {
    type: 'relative' | 'absolute' | 'external';
    permyriad?: number;
    money?: {
      type: 'centPrecision';
      fractionDigits: number;
      currencyCode: string;
      centAmount: number;
    }[];
  };
  predicate: string;
  sortOrder: string;
  isActive: boolean;
  references: {
    typeId: 'product';
    id: string;
  }[];
  createdAt: string;
  lastModifiedAt: string;
};

type TTaxCategory = {
  id: string;
  typeId: 'tax-category';
};

type TProductTypeInfo = {
  id: string;
  typeId: 'product-type';
};

export type TProductType = {
  id: string;
  version: number;
  key?: string;
  name: { 'en-US': string };
  description: string;
  attributes?: TProductAttribute[];
  createdAt: string;
  lastModifiedAt: string;
};

export type TProductAttribute = {
  name: string;
  value: string | { key: string; label: string };
};

type TCurrencyCode = 'USD';
