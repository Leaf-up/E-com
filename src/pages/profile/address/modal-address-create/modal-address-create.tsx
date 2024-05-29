import { Modal } from '~/shared';
import { Form } from '../form/form';
import { performProfileUpdate } from '~/api';
import { useCustomer } from '~/entities';
import { message } from '~/widgets';
import type { TAddress } from '~/api/types';
import type ModalAddressCreateProps from './types';

export function ModalAddressCreate({ isOpen, closeModal, type }: ModalAddressCreateProps) {
  const { user } = useCustomer();

  const sendRequest = async (data: TAddress): Promise<void> => {
    if (user) {
      const response = await performProfileUpdate(user, [
        {
          action: 'addAddress',
          address: {
            country: data.country,
            city: data.city,
            streetName: data.streetName,
            postalCode: data.postalCode,
          },
        },
      ]);

      if (response.error) {
        message.show(response.error, 'error');
        return Promise.reject(response.error);
      }

      if (response.customer) {
        const addressId = response.customer.addresses.at(-1)?.id ?? null;
        message.show('Address was successfully added');

        if (addressId) {
          const addAddressIdResponse = await performProfileUpdate(response.customer, [
            {
              action: type === 'billing' ? 'addBillingAddressId' : 'addShippingAddressId',
              addressId,
            },
          ]);

          if (addAddressIdResponse.error) {
            message.show(addAddressIdResponse.error, 'error');
            return Promise.reject(addAddressIdResponse.error);
          }
          closeModal();
        }
      }
    }
    return Promise.resolve();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      {isOpen && <Form type={type} sendRequest={sendRequest} onCancelButtonClick={closeModal} />}
    </Modal>
  );
}
