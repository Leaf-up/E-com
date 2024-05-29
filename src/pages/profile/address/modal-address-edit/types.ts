import { TAddress } from '~/api/types';

export default interface ModalAddressEditProps {
  isOpen: boolean;
  closeModal: () => void;
  address: TAddress | null;
  type: string;
}
