import { useCustomer } from '~/entities';
import { CardCart } from '~/ui';

export function Cart() {
  const { cart } = useCustomer();
  const cartItems =
    cart && cart.totalLineItemQuantity ? cart.lineItems.map((item, i) => <CardCart key={i} item={item} />) : [];

  if (cart) {
    return (
      <section aria-label="Cart">
        {cartItems}
        <p>
          {'Total: '}
          <span>{cart.totalLineItemQuantity}</span>
          {' for '}
          <span>{cart.totalPrice.centAmount / 100}$</span>
        </p>
      </section>
    );
  }

  return <p>Cart is empty</p>;
}
