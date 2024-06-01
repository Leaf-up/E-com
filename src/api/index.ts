import performLogin from './auth/login';
import performRegister from './auth/create';
import performProfileUpdate from './profile/update';
import requestProducts from './products/products';
import performChangePassword from './profile/password';
import requestCategoty from './products/category';
import requestDiscount from './products/discount';
import search from './products/search';
import filter from './products/filter';

export {
  performRegister,
  performLogin,
  performProfileUpdate,
  performChangePassword,
  requestProducts,
  requestCategoty,
  requestDiscount,
  search,
  filter,
};
