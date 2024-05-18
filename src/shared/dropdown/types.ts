export default interface DropDownProps {
  label?: string;
  id?: string;
  name: string;
  placeholder: string;
  options: string[];
  errorMessage?: string | null;
  isDisabled?: boolean;
  onClick: (value: string) => void;
}
