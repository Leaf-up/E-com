import { ReactElement } from 'react';

export default interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactElement;
}
