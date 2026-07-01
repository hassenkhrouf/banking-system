import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  template: `
    <div class="auth-shell">
      <div class="auth-hero">
        <span class="eyebrow">Open an account</span>
        <h1>Start banking smarter in minutes.</h1>
        <p>Join thousands of customers who already rely on Northstar Bank for seamless everyday banking.</p>
        <ul class="auth-list">
          <li><span class="list-bullet">✦</span> Fast onboarding</li>
          <li><span class="list-bullet">✦</span> Secure account access</li>
          <li><span class="list-bullet">✦</span> Helpful tools for growth</li>
        </ul>
      </div>
      <div class="card modern-card p-4 p-lg-5">
        <h3 class="mb-3">Create your account</h3>
        <p class="page-subtitle mb-4">A few details and you're ready to go.</p>
        @if (error) { <div class="alert alert-danger">{{ error }}</div> }
        <form (ngSubmit)="onSubmit()">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">First Name</label>
              <input type="text" class="form-control" [(ngModel)]="firstName" name="firstName" required>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Last Name</label>
              <input type="text" class="form-control" [(ngModel)]="lastName" name="lastName" required>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" [(ngModel)]="email" name="email" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" [(ngModel)]="password" name="password" required minlength="6">
          </div>
          <div class="mb-3">
            <label class="form-label">Phone (optional)</label>
            <input type="text" class="form-control" [(ngModel)]="phone" name="phone">
          </div>
          <button type="submit" class="btn btn-primary w-100" [disabled]="loading">
            {{ loading ? 'Creating account...' : 'Create account' }}
          </button>
        </form>
        <p class="text-center mt-3 mb-0">Already have an account? <a routerLink="/login">Sign in</a></p>
      </div>
    </div>
  `
})
export class RegisterComponent {
  firstName = ''; lastName = ''; email = ''; password = ''; phone = '';
  loading = false; error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.loading = true; this.error = '';
    this.authService.register({ firstName: this.firstName, lastName: this.lastName, email: this.email, password: this.password, phone: this.phone || undefined })
      .subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: err => { this.error = err.error?.message || 'Registration failed'; this.loading = false; }
      });
  }
}
