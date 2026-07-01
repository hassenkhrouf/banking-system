export interface CreateAccountRequest {
  type: 'SAVINGS' | 'CURRENT';
}

export interface AccountResponse {
  id: number;
  accountNumber: string;
  type: string;
  balance: number;
  status: string;
  ownerName: string;
  createdAt: string;
}
