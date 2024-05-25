export default interface PasswordFormProps {
  disableEditMode: () => void;
}

export type TPasswordsData = {
  currentPassword: string;
  newPassword: string;
};
