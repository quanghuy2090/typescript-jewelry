export interface Users {
  id?: string | number;
  email: string;
  password: string;
  confirmPass: string;
  avatar?: string;
  address?: string;
  phoneNumber?: string;
}
