import { isAxiosError } from 'axios';
import type { ApiErrorEnvelope } from '../../types/api';

export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    const data = error.response?.data as ApiErrorEnvelope | undefined;
    if (data?.message) {
      return data.message;
    }
    if (error.message) {
      return error.message;
    }
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Something went wrong.';
};
