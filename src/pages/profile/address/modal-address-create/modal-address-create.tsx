import { useState } from 'react';
import { Modal } from '~/shared/modal/modal';
import { Form } from '../form/form';
import { performProfileUpdate } from '~/api';
import { useCustomer } from '~/entities';
import { message } from '~/widgets';
import { type TAddress } from '~/api/types';
import type ModalAddressCreateProps from './types';

export function ModalAddressCreate({ isOpen, closeModal, type }: ModalAddressCreateProps) {
  const { user } = useCustomer();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendRequest = async (data: TAddress): Promise<void> => {
    setLoading(true);
    setError('');

    if (user) {
      const addAddressResponse = await performProfileUpdate(user, [
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

      if (addAddressResponse.error) {
        setLoading(false);
        setError(addAddressResponse.error);
        message.show(addAddressResponse.error, 'error');
        return Promise.reject();
      }
      setLoading(false);

      if (addAddressResponse.customer) {
        const addressId = addAddressResponse.customer.addresses.at(-1)?.id ?? null;
        message.show('Address was successfully added');

        if (addressId) {
          const addAddressIdResponse = await performProfileUpdate(addAddressResponse.customer, [
            {
              action: type === 'billing' ? 'addBillingAddressId' : 'addShippingAddressId',
              addressId,
            },
          ]);

          if (addAddressIdResponse.error) {
            setLoading(false);
            setError(addAddressIdResponse.error);
            message.show(addAddressIdResponse.error, 'error');
            return Promise.reject();
          }
          setLoading(false);
          closeModal();
        }
      }
    }
    return Promise.resolve();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Form
        type={type}
        sendRequest={sendRequest}
        onCancelButtonClick={closeModal}
        loading={loading}
        error={error}
        resetOnSuccessSubmit
      />
    </Modal>
  );
}
