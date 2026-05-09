/** Common API envelope used by phone OTP endpoints (align with backend). */
export type PhoneOtpApiEnvelope<T> = {
  status: boolean;
  message: string;
  data: T | null;
  errors?: unknown;
  errorCode?: string | null;
};

export type PhoneOtpRequestSuccessData = {
  challengeId: string | number;
  [key: string]: unknown;
};

export type PhoneOtpVerifySuccessData = {
  token: string;
  user?: unknown;
  [key: string]: unknown;
};
