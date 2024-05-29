import { TAddress } from '~/api/types';

export default interface TableProps {
  type: 'billing' | 'shipping';
  onEditClick: (address: TAddress) => void;
}
