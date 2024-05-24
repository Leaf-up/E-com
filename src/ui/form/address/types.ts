export default interface AddressProps {
  title: string;
  setCountryValid: (value: boolean) => void;
  setCityValid: (value: boolean) => void;
  setStreetValid: (value: boolean) => void;
  setPostalCodeValid: (value: boolean) => void;
  radioLabel: string;
  value: string;
  defaultChecked?: boolean;
  type: string;
  isReadonly?: boolean;
  isHidden?: boolean;
}
