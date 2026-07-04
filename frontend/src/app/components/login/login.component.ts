import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  template: `
    <div class="auth-page">
      <div class="auth-shell">
        <div class="auth-hero">
          <span class="eyebrow">Secure digital banking</span>
          <h1>Manage your money with<br>calm confidence.</h1>
          <p>Open accounts, move funds instantly, and track every transaction from one streamlined experience.</p>
          <ul class="auth-list">
            <li><span class="list-bullet">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span> Real-time account monitoring</li>
            <li><span class="list-bullet">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span> Fast transfers and deposits</li>
            <li><span class="list-bullet">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span> Trusted, modern security</li>
          </ul>
        </div>
        <div class="auth-card">
          <h3>Welcome back</h3>
          <p class="page-subtitle">Sign in to continue to your dashboard.</p>
          @if (error) {
            <div class="alert alert-danger">{{ error }}</div>
          }
          <form #loginForm="ngForm" (ngSubmit)="onSubmit()">
            <div class="auth-field">
              <label>Email</label>
              <div class="auth-input-wrap">
                <svg class="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <input type="email" class="form-control" [(ngModel)]="email" name="email" #emailInput="ngModel" required email placeholder="you@company.com">
              </div>
              @if (emailInput.invalid && (emailInput.dirty || emailInput.touched)) {
                <small class="text-danger">Please enter a valid email address</small>
              }
            </div>
            <div class="auth-field">
              <label>Password</label>
              <div class="auth-input-wrap">
                <svg class="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input type="password" class="form-control" [(ngModel)]="password" name="password" #passwordInput="ngModel" required minlength="6" placeholder="Enter your password">
              </div>
              @if (passwordInput.invalid && (passwordInput.dirty || passwordInput.touched)) {
                <small class="text-danger">Password must be at least 6 characters</small>
              }
            </div>
            <button type="submit" class="auth-btn" [disabled]="loading">
              @if (loading) { <span class="spinner"></span> }
              {{ loading ? 'Signing in...' : 'Sign in' }}
            </button>
          </form>
          <div class="auth-footer">Don't have an account? <a routerLink="/register">Create one</a></div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.error = '';
    if (!this.email || !this.password) {
      this.error = 'Email and password are required'; this.loading = false; return;
    }
    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: err => {
          this.error = err.error?.message || 'Login failed';
          this.loading = false;
        }
      });
  }
}
