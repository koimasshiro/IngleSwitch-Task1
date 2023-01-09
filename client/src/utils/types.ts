export type AuthData = {
  token: string;
  email: string;
};

export type SignInPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};
