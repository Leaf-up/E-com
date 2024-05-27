export default interface SelectProps {
  name?: string;
  options: string[];
  value: number;
  isReadonly?: boolean;
  onChange?: (value: number) => void;
}
