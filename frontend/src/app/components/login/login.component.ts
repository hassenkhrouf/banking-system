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
    <div class="auth-shell">
      <div class="auth-hero">
        <span class="eyebrow">Secure digital banking</span>
        <h1>Manage your money with calm confidence.</h1>
        <p>Open accounts, move funds instantly, and track every transaction from one streamlined experience.</p>
        <ul class="auth-list">
          <li><span class="list-bullet">✓</span> Real-time account monitoring</li>
          <li><span class="list-bullet">✓</span> Fast transfers and deposits</li>
          <li><span class="list-bullet">✓</span> Trusted, modern security</li>
        </ul>
      </div>
      <div class="card modern-card p-4 p-lg-5">
        <h3 class="mb-3">Welcome back</h3>
        <p class="page-subtitle mb-4">Sign in to continue to your dashboard.</p>
        @if (error) {
          <div class="alert alert-danger">{{ error }}</div>
        }
        <form (ngSubmit)="onSubmit()">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" [(ngModel)]="email" name="email" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" [(ngModel)]="password" name="password" required>
          </div>
          <button type="submit" class="btn btn-primary w-100" [disabled]="loading">
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </form>
        <p class="text-center mt-3 mb-0">Don't have an account? <a routerLink="/register">Create one</a></p>
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
