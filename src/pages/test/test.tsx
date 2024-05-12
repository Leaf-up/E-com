import { customerStore, useCustomer } from '~/entities';
import { objectKeys } from '~/utils';

export function Test() {
  const { user } = useCustomer();

  const handleDelete = () => {
    customerStore.user = null;
  };

  const handleSet = () => {
    customerStore.user = {
      id: '01',
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
      <table>
        <tbody>
          {user &&
            objectKeys(user).map((key) => {
              const val = user[key];
              return typeof val === 'string' ? (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{val}</td>
                </tr>
              ) : null;
            })}
        </tbody>
      </table>
      <hr />
      <button type="button" onClick={handleSet}>
        Set example customer
      </button>
      <br />
      <button type="button" onClick={handleDelete}>
        Delete customer
      </button>
    </section>
  );
}
