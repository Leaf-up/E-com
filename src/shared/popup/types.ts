import { ReactNode } from 'react';

export default interface PopupProps<T extends HTMLElement> {
  targetRef: React.RefObject<T> | null;
  children: ReactNode;
}
