export interface UserInformation {
  loginId: string;
}

export type LoginForm = {
  id: string;
  password: string;
};
export type SignupForm = {
  id: string;
  password: string;
  checkPassword: string;
};
export type Guest = {
  id: number;
  loginId: string;
  userStatus: string;
  targetEvent: null;
};
