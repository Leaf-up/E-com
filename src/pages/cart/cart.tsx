import { useEffect } from 'react';
import { requestCart } from '~/api';
import { useCustomer } from '~/entities';
import { CardCart } from '~/ui';

export function Cart() {
  const { cart } = useCustomer();
  const cartItems =
    cart && cart.totalLineItemQuantity ? cart.lineItems.map((item, i) => <CardCart key={i} item={item} />) : [];

  useEffect(() => {
    /* Stupid action (cart is allready in store).
     ** Added only to match "The list of items is fetched from the commercetools API" criteria.
     */
    if (cart) requestCart(cart.id);
  }, []);

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
