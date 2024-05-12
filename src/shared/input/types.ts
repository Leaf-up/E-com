import { ReactNode } from 'react';

export default interface InputProps {
  label?: string;
  name: string;
  id?: string;
  type?: 'text' | 'password';
  errorMessage?: string | null;
  placeholder: string;
  value?: string;
  readonly?: boolean;
  inputIcon?: ReactNode;
  onChange?: (value: string) => void;
  onClick?: (value: string) => void;
}
