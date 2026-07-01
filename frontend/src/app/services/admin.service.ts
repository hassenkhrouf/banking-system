import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AccountResponse } from '../models/account.model';
import { TransactionResponse } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  toggleUserEnabled(userId: number): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${userId}/toggle-enabled`, {});
  }

  getAllAccounts(): Observable<AccountResponse[]> {
    return this.http.get<AccountResponse[]>(`${this.apiUrl}/accounts`);
  }

  getAllTransactions(): Observable<TransactionResponse[]> {
    return this.http.get<TransactionResponse[]>(`${this.apiUrl}/transactions`);
  }
}
