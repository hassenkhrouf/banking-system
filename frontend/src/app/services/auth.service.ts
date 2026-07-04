import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { LoginRequest, RegisterRequest, JwtResponse } from '../models/auth.model';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  private tokenKey = 'access_token';
  private refreshKey = 'refresh_token';
  private roleKey = 'user_role';
  private emailKey = 'user_email';
  private authSubject = new BehaviorSubject<boolean>(this.hasToken());

  auth$ = this.authSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(request: RegisterRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/register`, request).pipe(
      tap(res => this.saveTokens(res))
    );
  }

  login(request: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(res => this.saveTokens(res))
    );
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.emailKey);
    this.authSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  private saveTokens(res: JwtResponse): void {
    localStorage.setItem(this.tokenKey, res.accessToken);
    localStorage.setItem(this.refreshKey, res.refreshToken);
    localStorage.setItem(this.roleKey, res.role);
    localStorage.setItem(this.emailKey, res.email);
    this.authSubject.next(true);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
