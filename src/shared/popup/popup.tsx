import { useRef } from 'react';
import { createPortal } from 'react-dom';
import type PopupProps from './types';
import styles from './popup.module.css';

export function Popup<T extends HTMLElement>({ children, targetRef }: PopupProps<T>) {
  const popupRef = useRef<HTMLDivElement>(null);

  if (popupRef.current) {
    if (targetRef?.current) {
      const popupRect = popupRef.current.getBoundingClientRect();
      const targetRect = targetRef.current.getBoundingClientRect();
      const viewportBottom = window.scrollY + window.innerHeight;
      const viewportRight = window.scrollX + document.body.scrollWidth;

      const targetTop =
        targetRect.bottom + popupRect.height < viewportBottom ? targetRect.bottom : viewportBottom - popupRect.height;
      const targetLeft =
        targetRect.left + popupRect.width < viewportRight ? targetRect.left : viewportRight - popupRect.width;

      popupRef.current.setAttribute('style', `top: ${targetTop}px; left: ${targetLeft}px;`);
    } else {
      popupRef.current.setAttribute('style', `top: 0px; left: 0px;`);
    }
  }

  return createPortal(
    <div
      className={!targetRef ? styles.popup : `${styles.popup} ${styles.popup_active}`}
      onClick={(e) => {
        e.nativeEvent.stopImmediatePropagation();
      }}
      aria-hidden
      ref={popupRef}
    >
      {children}
    </div>,
    document.body,
  );
}
