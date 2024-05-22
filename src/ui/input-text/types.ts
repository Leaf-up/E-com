export default interface InputTextProps {
  label?: string;
  name: string;
  id?: string;
  placeholder: string;
  setValid: (value: boolean) => void;
}
