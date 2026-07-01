import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateAccountRequest, AccountResponse } from '../models/account.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private apiUrl = 'http://localhost:8080/api/accounts';

  constructor(private http: HttpClient) {}

  createAccount(request: CreateAccountRequest): Observable<AccountResponse> {
    return this.http.post<AccountResponse>(this.apiUrl, request);
  }

  getAccount(accountNumber: string): Observable<AccountResponse> {
    return this.http.get<AccountResponse>(`${this.apiUrl}/${accountNumber}`);
  }

  getMyAccounts(): Observable<AccountResponse[]> {
    return this.http.get<AccountResponse[]>(`${this.apiUrl}/my`);
  }

  closeAccount(accountNumber: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${accountNumber}/close`, {});
  }
}
