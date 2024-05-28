export default interface ModalAddressCreateProps {
  isOpen: boolean;
  closeModal: () => void;
  type: 'billing' | 'shipping';
}
