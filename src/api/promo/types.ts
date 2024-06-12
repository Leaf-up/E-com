export type TCartPromo = {
  id: string;
  version: number;
  name: { 'en-US': string };
  description: { 'en-US': string };
  code: string;
  cartDiscounts: {
    id: string;
    typeId: 'cart-discount';
  }[];
  isActive: boolean;
  references: unknown[];
  groups: unknown[];
};
