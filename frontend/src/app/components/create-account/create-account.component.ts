import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  template: `
    <div class="row justify-content-center">
      <div class="col-lg-5 col-md-7">
        <div class="card modern-card p-4 p-lg-5">
          <div class="mb-4">
            <h3 class="mb-2">Open a new account</h3>
            <p class="page-subtitle mb-0">Choose the account that best fits your financial goals.</p>
          </div>
          @if (error) { <div class="alert alert-danger">{{ error }}</div> }
          @if (success) { <div class="alert alert-success">{{ success }}</div> }
          <form (ngSubmit)="onSubmit()">
            <div class="mb-4">
              <label class="form-label">Account Type</label>
              <select class="form-select" [(ngModel)]="type" name="type" required>
                <option value="SAVINGS">Savings</option>
                <option value="CURRENT">Current</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary w-100" [disabled]="loading">{{ loading ? 'Creating account...' : 'Create account' }}</button>
          </form>
          <a routerLink="/accounts" class="btn btn-link mt-3 px-0">Back to accounts</a>
        </div>
      </div>
    </div>
  `
})
export class CreateAccountComponent {
  type: 'SAVINGS' | 'CURRENT' = 'SAVINGS';
  loading = false; error = ''; success = '';
  constructor(private accountService: AccountService, private router: Router) {}
  onSubmit() {
    this.loading = true; this.error = ''; this.success = '';
    this.accountService.createAccount({ type: this.type }).subscribe({
      next: (res) => { this.success = `Account ${res.accountNumber} created!`; setTimeout(() => this.router.navigate(['/accounts']), 1500); },
      error: (err) => { this.error = err.error?.message || 'Failed to create account'; this.loading = false; }
    });
  }
}
