/** Normalized API envelope for POST /auth/login */
export type AuthLoginApiResponse = {
  status: boolean;
  message: string;
  data: AuthLoginSuccessPayload | null;
  errors: string | null;
  errorCode: string | null;
};

export type AuthLoginSuccessPayload = {
  user: AuthUserDto;
  token: string;
};

export type AuthUserDto = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  country: string | null;
  signupMethod: string;
  role: string;
  [key: string]: unknown;
};
