export type TRawProduct = {
  id: string; // Unique identifier of the Product.
  version: number; // Current version of the Product.
  key?: string; // User-defined unique identifier of the Product.
  productType: TProductTypeInfo; // The Product Type defining the Attributes of the Product.
  masterData: {
    published: boolean;
    current: TProductData;
    staged: TProductData;
    hasStagedChanges: boolean;
  };
  taxCategory?: TTaxCategory; // The TaxCategory of the Product.
  priceMode?: 'Embedded' | 'Standalone'; // Type of Price to be used when looking up a price for the Product.
  createdAt: string; // Date and time (UTC) the Product was initially created.
  lastModifiedAt?: string; // Date and time (UTC) the Product was last updated.
};

type TProductData = {
  name: { 'en-US': string };
  categories: TCategoryInfo[];
  slug: {
    'en-US': string;
  }; // User-defined identifier used in a deep-link URL for the Product
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
  orderHint: string; // Decimal value between 0 and 1
  createdAt: string;
  lastModifiedAt: string;
};

export type TProductVariant = {
  id: number; // Sequential identifier
  key?: string; // User-defined unique identifier
  sku?: string; // User-defined unique SKU
  prices?: TPrice[];
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
  fractionDigits: number; // Number of digits after the decimal separator
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
  name: { 'en-US': string }; // Name of the ProductType.
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
  id: string; // Unique identifier of the ProductType.
  version: number; // Current version of the ProductType.
  key?: string; // User-defined unique identifier of the ProductType.
  name: { 'en-US': string }; // Name of the ProductType.
  description: string; // Description of the ProductType.
  attributes?: TProductAttribute[]; // Attributes specified for the ProductType.
  createdAt: string;
  lastModifiedAt: string;
};

export type TProductAttribute = {
  name: string;
  value: string | { key: string; label: string };
};

type TCurrencyCode = 'USD';
