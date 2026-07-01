export interface DepositRequest {
  accountNumber: string;
  amount: number;
  description?: string;
}

export interface WithdrawRequest {
  accountNumber: string;
  amount: number;
  description?: string;
}

export interface TransferRequest {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
  description?: string;
}

export interface TransactionResponse {
  id: number;
  fromAccountNumber: string | null;
  toAccountNumber: string | null;
  amount: number;
  type: string;
  description: string;
  referenceNumber: string;
  createdAt: string;
}
