import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { BANK_NAME } from '../../constants';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  template: `
    <div class="auth-page">
      <div class="auth-shell">
        <div class="auth-hero">
          <span class="eyebrow">Open an account</span>
          <h1>Start banking smarter<br>in minutes.</h1>
          <p>Join thousands of customers who already rely on {{ bankName }} for seamless everyday banking.</p>
          <ul class="auth-list">
            <li><span class="list-bullet">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span> Fast onboarding</li>
            <li><span class="list-bullet">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span> Secure account access</li>
            <li><span class="list-bullet">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span> Helpful tools for growth</li>
          </ul>
        </div>
        <div class="auth-card">
          <h3>Create your account</h3>
          <p class="page-subtitle">A few details and you're ready to go.</p>
          @if (error) { <div class="alert alert-danger">{{ error }}</div> }
          <form #registerForm="ngForm" (ngSubmit)="onSubmit()">
            <div class="row">
              <div class="col-md-6 auth-field">
                <label>First Name</label>
                <div class="auth-input-wrap">
                  <svg class="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input type="text" class="form-control" [(ngModel)]="firstName" name="firstName" #firstNameInput="ngModel" required placeholder="John">
                </div>
                @if (firstNameInput.invalid && (firstNameInput.dirty || firstNameInput.touched)) {
                  <small class="text-danger">First name is required</small>
                }
              </div>
              <div class="col-md-6 auth-field">
                <label>Last Name</label>
                <div class="auth-input-wrap">
                  <svg class="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input type="text" class="form-control" [(ngModel)]="lastName" name="lastName" #lastNameInput="ngModel" required placeholder="Doe">
                </div>
                @if (lastNameInput.invalid && (lastNameInput.dirty || lastNameInput.touched)) {
                  <small class="text-danger">Last name is required</small>
                }
              </div>
            </div>
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
                <input type="password" class="form-control" [(ngModel)]="password" name="password" #passwordInput="ngModel" required placeholder="Create a strong password">
              </div>
              @if (passwordInput.invalid && (passwordInput.dirty || passwordInput.touched)) {
                <small class="text-danger">Password is required</small>
              }
            </div>
            <div class="auth-field">
              <label>Phone (optional)</label>
              <div class="auth-input-wrap">
                <svg class="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <input type="tel" class="form-control" [(ngModel)]="phone" name="phone" #phoneInput="ngModel" pattern="[0-9+\s]*" title="Only numbers, + and spaces allowed" placeholder="+1 (555) 000-0000" (input)="phone = phone.replace(/[^0-9+ ]/g, '')">
              </div>
            </div>
            <button type="submit" class="auth-btn" [disabled]="loading">
              @if (loading) { <span class="spinner"></span> }
              {{ loading ? 'Creating account...' : 'Create account' }}
            </button>
          </form>
          <div class="auth-footer">Already have an account? <a routerLink="/login">Sign in</a></div>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  bankName = BANK_NAME;
  firstName = ''; lastName = ''; email = ''; password = ''; phone = '';
  loading = false; error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.loading = true; this.error = '';
    if (!this.firstName || !this.lastName || !this.email || !this.password) {
      this.error = 'All fields are required'; this.loading = false; return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.error = 'Please enter a valid email address'; this.loading = false; return;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,40}$/.test(this.password)) {
      this.error = 'Password must be 6-40 characters with uppercase, lowercase and a digit'; this.loading = false; return;
    }
    this.authService.register({ firstName: this.firstName, lastName: this.lastName, email: this.email, password: this.password, phone: this.phone || undefined })
      .subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: err => { this.error = err.error?.message || 'Registration failed'; this.loading = false; }
      });
  }
}
