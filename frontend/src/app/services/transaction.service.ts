import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepositRequest, WithdrawRequest, TransferRequest, TransactionResponse } from '../models/transaction.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private apiUrl = `${environment.apiUrl}/transactions`;


  constructor(private http: HttpClient) {}

  deposit(request: DepositRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(`${this.apiUrl}/deposit`, request);
  }

  withdraw(request: WithdrawRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(`${this.apiUrl}/withdraw`, request);
  }

  transfer(request: TransferRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(`${this.apiUrl}/transfer`, request);
  }

  getHistory(accountNumber: string): Observable<TransactionResponse[]> {
    return this.http.get<TransactionResponse[]>(`${this.apiUrl}/${accountNumber}`);
  }
}
