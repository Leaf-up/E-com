import type { TProductVariant, TPrice, TMoney } from '../products/types';
import type { TAddress } from '../types';

export type TCart = {
  id: string;
  version: number;
  lineItems: TLineItem[];
  customLineItems: TLineItem[];
  cartState: 'Active' | 'Merged' | 'Ordered' | 'Frozen';
  totalPrice: TMoney;
  shippingMode: 'Single' | 'Multiple';
  shipping: TShipping[];
  discountCodes: TDiscountCodeInfo[];
  directDiscounts: unknown[];
  inventoryMode: 'None' | 'TrackOnly' | 'ReserveOnOrder';
  taxMode: 'Platform' | 'External' | 'ExternalAmount' | 'Disabled';
  taxRoundingMode: 'HalfEven' | 'HalfUp' | 'HalfDown';
  taxCalculationMode: 'LineItemLevel' | 'UnitPriceLevel';
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
  productId?: string; // Used to add
  lineItemId?: string; // Used to remove, change
  quantity?: number;
  address: TAddress; // Used to set address
};

type TCartAction =
  | 'addLineItem'
  | 'removeLineItem'
  | 'changeLineItemQuantity'
  | 'setShippingAddress'
  | 'setBillingAddress';
