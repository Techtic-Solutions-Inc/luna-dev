import type {
  EmailVerificationRequest,
  EmailVerificationResponse,
} from '../../types/api';

export interface ApiEndpointDefinition<
  TMethod extends 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  TPath extends string,
> {
  method: TMethod;
  path: TPath;
  authRequired: boolean;
}

export const apiContract = {
  endpoints: {
    authLogin: {
      method: 'POST',
      path: '/api/auth/login',
      authRequired: false,
    } satisfies ApiEndpointDefinition<'POST', '/api/auth/login'>,
    authSignup: {
      method: 'POST',
      path: '/api/auth/signup',
      authRequired: false,
    } satisfies ApiEndpointDefinition<'POST', '/api/auth/signup'>,
    emailVerify: {
      method: 'POST',
      path: '/api/email/verify',
      authRequired: false,
    } satisfies ApiEndpointDefinition<'POST', '/api/email/verify'>,
  },
} as const;

export const emailVerifyEndpoint = apiContract.endpoints.emailVerify;

export type EmailVerifyRequestBody = EmailVerificationRequest;
export type EmailVerifyResponseBody = EmailVerificationResponse;
