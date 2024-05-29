import { ReactNode } from 'react';

export default interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
