import { createPortal } from 'react-dom';
import { NavigationMenu } from '~/widgets/navigation/nav';
import type SideMenuProps from './types';

import styles from './side-menu.module.css';

export function SideMenu({ isOpen, onClose }: SideMenuProps) {
  return createPortal(
    <div className={`${styles.modal_overlay} ${isOpen && styles.modal_active}`} onClick={onClose} aria-hidden>
      <div
        className={`${styles.modal} ${isOpen && styles.modal_active}`}
        onClick={(e) => e.stopPropagation()}
        aria-hidden
      >
        <NavigationMenu isColumn onClick={onClose} />
      </div>
    </div>,
    document.body,
  );
}
