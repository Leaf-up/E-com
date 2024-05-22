import { customerStore, useCustomer } from '~/entities';
import { performProfileUpdate } from '~/api';
import type { TProfileAction } from '~/api/profile/types';
import { objectKeys } from '~/utils';
import { message } from '~/widgets';

const ban = ['versionModifiedAt', 'lastMessageSequenceNumber', 'createdAt', 'lastModifiedAt', 'password'];

export function PageTest() {
  const { user, logout } = useCustomer();

  const handleSetUser = () => {
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

  const handleUpdateAddress = () => {
    const actions: TProfileAction[] = [
      {
        action: 'removeAddress',
        addressId: user?.addresses[0].id,
      },
      {
        action: 'addAddress',
        address: {
          streetName: 'Any Street',
          postalCode: '11111',
          city: 'Any City',
          country: 'US',
        },
      },
      {
        action: 'setDefaultBillingAddress',
        addressId: user?.addresses[1].id,
      },
      // And so on for changeAddress, setDefaultShippingAddress
    ];

    if (customerStore.user) {
      performProfileUpdate(customerStore.user, actions).then((response) => {
        if (response.error) {
          message.show(response.error, 'error');
          return;
        }
        message.show('Used data was successfuly updated!');
      });
    }
  };

  return (
    <section>
      <h1>Customer state test</h1>
      <table>
        <tbody>
          {user &&
            objectKeys(user).map((key) => {
              if (!ban.includes(key)) {
                const val = user[key];
                if (typeof val === 'string' || typeof val === 'number')
                  return (
                    <tr key={key.toString()}>
                      <td>{key.toString()}</td>
                      <td>{val}</td>
                    </tr>
                  );
                if (Array.isArray(val))
                  return (
                    <tr key={key.toString()}>
                      <td>{key.toString()}</td>
                      <td>{`Array[${val.length}]`}</td>
                    </tr>
                  );
              }
              return null;
            })}
        </tbody>
      </table>
      <hr />
      <button type="button" onClick={handleSetUser}>
        Set example customer (virtual)
      </button>
      <br />
      <button type="button" onClick={handleUpdateAddress}>
        Set example address using api (for real user only)
      </button>
      <br />
      <button type="button" onClick={logout}>
        Logout
      </button>
    </section>
  );
}
