import type { PropsWithChildren } from 'react';

export default interface ButtonSubmitProps extends PropsWithChildren {
  loading: boolean;
  disabled: boolean;
}
