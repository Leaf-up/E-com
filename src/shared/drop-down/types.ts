export default interface DropDownProps {
  label?: string;
  id?: string;
  name: string;
  placeholder: string;
  options: string[];
  errorMessage?: string | null;
  value: string;
  setValue: (value: string) => void;
}
