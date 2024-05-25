export default interface IdentityFormProps {
  isEdit: boolean;
  disableEditMode: () => void;
}

export type TProfileData = {
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
};
