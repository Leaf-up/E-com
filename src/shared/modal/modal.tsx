import { createPortal } from 'react-dom';
import type ModalProps from './types';
import styles from './modal.module.css';

export function Modal({ isOpen, onClose, children }: ModalProps) {
  return createPortal(
    <div className={`${styles.modal_overlay} ${isOpen && styles.modal_active}`} onClick={onClose} aria-hidden>
      <div
        className={`${styles.modal} ${isOpen && styles.modal_active}`}
        onClick={(e) => e.stopPropagation()}
        aria-hidden
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
