import { Modal } from '~/shared';
import { Form } from '../form/form';
import { performProfileUpdate } from '~/api';
import { useCustomer } from '~/entities';
import { message } from '~/widgets';
import type ModalAddressEditProps from './types';
import type { TAddress } from '~/api/types';

export function ModalAddressEdit({ isOpen, closeModal, address, type }: ModalAddressEditProps) {
  const { user } = useCustomer();

  const sendRequest = async (data: TAddress): Promise<void> => {
    if (user && address) {
      const response = await performProfileUpdate(user, [
        {
          action: 'changeAddress',
          addressId: address?.id,
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
        message.show(`User ${type} address was successfully updated`);
      }
      closeModal();
    }
    return Promise.resolve();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      {isOpen && <Form type={type} address={address} sendRequest={sendRequest} onCancelButtonClick={closeModal} />}
    </Modal>
  );
}
