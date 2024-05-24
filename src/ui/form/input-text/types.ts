export default interface InputTextProps {
  label?: string;
  name: string;
  id?: string;
  value?: string;
  placeholder: string;
  readonly?: boolean;
  inputClass?: string;
  setValid: (value: boolean) => void;
}
