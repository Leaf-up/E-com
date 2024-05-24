export type TProduct = {
  id: string; // Unique identifier of the Product.
  version: number; // Current version of the Product.
  key?: string; // User-defined unique identifier of the Product.
  productType: TProductType; // The Product Type defining the Attributes of the Product.
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
  categories: TCategory;
  slug: string; // User-defined identifier used in a deep-link URL for the Product
  description: { 'en-US': string };
  masterVariant: TProductVariant;
  variants: TProductVariant[];
  searchKeywords: {
    en: { text: string }[];
  };
};

type TCategory = {
  id: string;
  typeId: 'category';
  obj?: {
    id: string;
    version: string;
    name: string;
    slug: string;
    ancestors: TCategory;
    parent?: TCategory;
    orderHint: string; // Decimal value between 0 and 1
    createdAt: string;
    lastModifiedAt: string;
  };
};

type TProductVariant = {
  id: number; // Sequential identifier
  key?: string; // User-defined unique identifier
  sku?: string; // User-defined unique SKU
  price?: TPrice;
  prices?: TPrice[];
  attributes?: TProductAttribute[];
  images: TProductImage[];
};

type TPrice = {
  id: string;
  value: TMoney;
  discounted?: {
    value: TMoney;
    discount: TDiscount;
  };
};

type TMoney = {
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

type TDiscount = {
  id: string;
  typeId: 'product-discount';
};

type TTaxCategory = {
  id: string;
  typeId: 'tax-category';
};

type TProductType = {
  id: string;
  typeId: 'product-type';
  obj?: {
    id: string; // Unique identifier of the ProductType.
    version: number; // Current version of the ProductType.
    key?: string; // User-defined unique identifier of the ProductType.
    name: string; // Name of the ProductType.
    description: string; // Description of the ProductType.
    attributes?: TProductAttribute[]; // Attributes specified for the ProductType.
    createdAt: string;
    lastModifiedAt: string;
  };
};

export type TProductAttribute = {
  name: string;
  value: string;
};

type TCurrencyCode = 'USD';
