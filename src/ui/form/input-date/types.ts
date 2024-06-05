export default interface InputDateProps {
  setValid: (value: boolean) => void;
  value?: string;
  inputClass?: string;
  readonly?: boolean;
  label?: string;
}
