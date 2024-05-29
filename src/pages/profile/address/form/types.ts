import { TAddress } from '~/api/types';

export default interface FormProps {
  type: string;
  address?: TAddress | null;
  loading: boolean;
  error: string;
  sendRequest: (data: TAddress) => Promise<void> | void;
  onCancelButtonClick: () => void;
}
