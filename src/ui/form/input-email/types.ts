export default interface InputEmailProps {
  setValid: (valid: boolean) => void;
  value?: string;
  inputClass?: string;
  readonly?: boolean;
  label?: string;
}
