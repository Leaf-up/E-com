import { ReactNode } from 'react';

export default interface InputProps {
  label?: string;
  name: string;
  id?: string;
  type?: 'text' | 'password' | 'radio' | 'checkbox';
  errorMessage?: string | null;
  placeholder?: string;
  value?: string;
  readonly?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  checked?: boolean;
  inputIcon?: ReactNode;
  inputClass?: string;
  onChange?: (value: string) => void;
  onClick?: (value: string) => void;
}
