import { ReactNode } from 'react';

export default interface InputProps {
  label?: string;
  name: string;
  id?: string;
  type: 'text' | 'password';
  errorMessage?: string | null;
  placeholder: string;
  inputIcon?: ReactNode;
  onChange?: (value: string) => void;
  onInput?: (value: string) => void;
}
