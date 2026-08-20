import { ContractGapError } from './errors';

export interface VisitorSubscribePayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  privacy_accepted: boolean;
  terms_accepted: boolean;
}

export async function searchVisitorHome(query: string): Promise<never> {
  void query;
  throw new ContractGapError('Visitor search endpoint not available');
}

export async function subscribeVisitorHome(
  payload: VisitorSubscribePayload,
): Promise<never> {
  void payload;
  throw new ContractGapError('Visitor subscribe endpoint not available');
}

export async function acceptVisitorTerms(payload: {
  privacy_accepted: boolean;
  terms_accepted: boolean;
}): Promise<never> {
  void payload;
  throw new ContractGapError('Visitor terms acceptance endpoint not available');
}
