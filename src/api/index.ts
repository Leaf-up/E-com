import tokenHolder from './token/token';
import performLogin from './auth/login';
import performRegister from './auth/create';
import performProfileUpdate from './profile/update';
import requestProducts from './products/products';
import performChangePassword from './profile/password';
import requestCategoty from './products/category';
import requestDiscount from './products/discount';
import filter from './products/filter';
import getLocalProducts from './local/local';
import prepareCart from './cart/create';
import requestCart from './cart/get';
import clearCart from './cart/delete';
import changeCart from './cart/update';

export {
  tokenHolder,
  performRegister,
  performLogin,
  performProfileUpdate,
  performChangePassword,
  requestProducts,
  requestCategoty,
  requestDiscount,
  filter,
  getLocalProducts,
  prepareCart,
  requestCart,
  clearCart,
  changeCart,
};
