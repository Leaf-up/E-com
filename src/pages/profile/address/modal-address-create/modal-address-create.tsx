import { useState } from 'react';
import { Modal } from '~/shared';
import { Form } from '../form/form';
import { performProfileUpdate } from '~/api';
import { useCustomer } from '~/entities';
import { message } from '~/widgets';
import type { TAddress } from '~/api/types';
import type ModalAddressCreateProps from './types';

export function ModalAddressCreate({ isOpen, closeModal, type }: ModalAddressCreateProps) {
  const { user } = useCustomer();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendRequest = (data: TAddress) => {
    setLoading(true);
    setError('');

    if (user) {
      performProfileUpdate(user, [
        {
          action: 'addAddress',
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
          const addressId = response.customer.addresses.at(-1)?.id ?? null;
          message.show('Address was successfully added');
          addressId &&
            performProfileUpdate(response.customer, [
              {
                action: type === 'billing' ? 'addBillingAddressId' : 'addShippingAddressId',
                addressId,
              },
            ]).then((resp) => {
              if (resp.error) {
                setError(resp.error);
                message.show(resp.error, 'error');
                return;
              }
              closeModal();
            });
        }
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      {isOpen && (
        <Form type={type} sendRequest={sendRequest} onCancelButtonClick={closeModal} loading={loading} error={error} />
      )}
    </Modal>
  );
}
