export const CATEGORY_SLUG = [undefined, 'positive-effect', 'negative-effect'];
export const CATEGORY_NAME = ['All', 'Positive effect', 'Negative effect'];
export const SUBCATEGORY_SLUG = [undefined, 'consumable', 'growable'];
export const SUBCATEGORY_NAME = ['All', 'Consumable', 'Growable'];
export const CATEGORY_DESC = {
  'positive-effect': 'Seeds from this category provide unique magic effects.',
  'negative-effect': 'Be careful with dagerous effects from this seeds!',
};

export const SORTING_NAME = ['None', 'Price: ascending', 'Price: descending', 'By name'];
export const SORTING_PARAM = ['None', 'price asc', 'price desc', 'name.en-US asc'];

export const FILTERS = {
  price: 'range 10-500',
  brand: ['None', 'Lucky farm', 'Happy witch'],
  weight: 'range 1-5',
  color: ['None', 'red', 'green'],
  size: ['None', 'S', 'M', 'L'],
  charmed: ['None', 'true', 'false'],
};
