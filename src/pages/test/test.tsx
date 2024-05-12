import { customerStore, useCustomer } from '~/entities';

export function Test() {
  const { user } = useCustomer();

  const handleDelete = () => {
    customerStore.user = null;
  };

  const handleSet = () => {
    customerStore.user = {
      id: '',
      version: 1,
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '01.01.1970',
      addresses: [],
      shippingAddressIds: [],
      billingAddressIds: [],
    };
  };

  return (
    <section>
      <h1>Customer state test</h1>
      <h3>Customer:</h3>
      <p style={{ wordBreak: 'break-all', maxWidth: '30em' }}>{JSON.stringify(user)}</p>
      <hr />
      <button onClick={handleSet}>Set example customer</button>
      <br />
      <button onClick={handleDelete}>Delete customer</button>
    </section>
  );
}
