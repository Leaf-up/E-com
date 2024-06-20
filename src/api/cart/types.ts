import type { TProductVariant, TPrice, TMoney } from '../products/types';
import type { TAddress } from '../types';

export type TCart = {
  id: string;
  version: number;
  lineItems: TLineItem[];
  customerId: string;
  customLineItems: TLineItem[];
  cartState: 'Active' | 'Merged' | 'Ordered' | 'Frozen';
  totalPrice: TMoney;
  shippingMode: 'Single' | 'Multiple';
  shipping: TShipping[];
  discountCodes: TDiscountCodeInfo[];
  directDiscounts: unknown[];
  discountOnTotalPrice?: {
    discountedAmount: TMoney;
  };
  inventoryMode: 'None' | 'TrackOnly' | 'ReserveOnOrder';
  taxMode: 'Platform' | 'External' | 'ExternalAmount' | 'Disabled';
  taxRoundingMode: 'HalfEven' | 'HalfUp' | 'HalfDown';
  taxCalculationMode: 'LineItemLevel' | 'UnitPriceLevel';
  totalLineItemQuantity: number;
  refusedGifts: unknown[];
  origin: 'Customer' | 'Merchant' | 'Quote';
  itemShippingAddresses: TAddress[];
};

export type TCartDraft = {
  currency: 'USD';
  customerId?: string;
  customerEmail?: string;
} & Partial<TCart>;

export type TLineItem = {
  id: string;
  slug?: string;
  productId: string;
  productKey: string;
  productType: {
    id: string;
    typeId: 'product-type';
  };
  name: { 'en-US': string };
  variant: TProductVariant;
  price: TPrice;
  quantity: number;
  totalPrice: TMoney;
  discountedPricePerQuantity: TDiscountedLineItemPriceForQuantity[];
  taxedPricePortions: TMethodTaxedPrice[];
  state: TItemState[];
  perMethodTaxRate: TMethodTaxRate[];
  priceMode: 'Platform' | 'ExternalPrice' | 'ExternalTotal';
  lineItemMode: 'Standard' | 'GiftLineItem';
};

type TDiscountedLineItemPriceForQuantity = {
  quantity: number;
  discountedPrice: {
    value: TMoney;
    includedDiscounts: {
      discount: {
        id: string;
        typeId: 'product';
      };
      discountedAmount: TMoney;
    }[];
  };
};

type TMethodTaxedPrice = {
  shippingMethodKey: string;
  taxedPrice: {
    totalNet: TMoney;
    totalGross: TMoney;
    taxPortions: {
      rate: number;
      amount: TMoney;
    }[];
  };
};

type TItemState = {
  quantity: number;
  state: {
    id: string;
    typeId: 'state';
  };
};

type TMethodTaxRate = {
  shippingMethodKey: string;
  taxRate: {
    name: string;
    amount: number;
    includedInPrice: boolean;
    country: 'US';
  };
};

type TShipping = {
  shippingKey: string;
  shippingInfo: {
    shippingMethodName: string;
    price: TMoney;
    shippingRate: {
      price: TMoney;
      tiers: unknown[];
    };
  };
};

type TDiscountCodeInfo = {
  discountCode: {
    id: string;
    typeId: 'discount-code';
  };
  state:
    | 'NotActive'
    | 'NotValid'
    | 'DoesNotMatchCart'
    | 'MatchesCart'
    | 'MaxApplicationReached'
    | 'ApplicationStoppedByPreviousDiscount';
};

export type TCartUpdateAction = {
  action: TCartAction;
  productId?: string;
  lineItemId?: string;
  quantity?: number;
  address?: TAddress;
  customerId?: string;
  email?: string;
  code?: string;
};

type TCartAction =
  | 'addLineItem'
  | 'removeLineItem'
  | 'changeLineItemQuantity'
  | 'setCustomerId'
  | 'setCustomerEmail'
  | 'setShippingAddress'
  | 'setBillingAddress'
  | 'addDiscountCode';
