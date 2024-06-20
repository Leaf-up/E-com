export default interface SelectProps {
  title?: string;
  name?: string;
  options: string[];
  value?: number;
  isReadonly?: boolean;
  onChange?: (value: number) => void;
}
