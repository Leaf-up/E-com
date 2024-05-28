import { useState } from 'react';
import { Modal } from '~/shared/modal/modal';
import { Form } from '../form/form';
import { performProfileUpdate } from '~/api';
import { useCustomer } from '~/entities';
import { message } from '~/widgets';
import type ModalAddressEditProps from './types';
import { type TAddress } from '~/api/types';

export function ModalAddressEdit({ isOpen, closeModal, address, type }: ModalAddressEditProps) {
  const { user } = useCustomer();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendRequest = (data: TAddress) => {
    setLoading(true);
    setError('');

    if (user && address) {
      performProfileUpdate(user, [
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
      ]).then((response) => {
        if (response.error) {
          setLoading(false);
          setError(response.error);
          message.show(response.error, 'error');
          return;
        }
        setLoading(false);
        if (response.customer) {
          message.show(`User ${type} address was successfully updated`);
        }
        closeModal();
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Form
        type={type}
        address={address}
        sendRequest={sendRequest}
        onCancelButtonClick={closeModal}
        loading={loading}
        error={error}
      />
    </Modal>
  );
}
