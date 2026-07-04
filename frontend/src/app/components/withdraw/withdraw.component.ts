import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';
import { AccountResponse } from '../../models/account.model';

@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  template: `
    <div class="row justify-content-center">
      <div class="col-lg-5 col-md-7">
        <div class="card modern-card p-4 p-lg-5">
          <div class="mb-4">
            <h3 class="mb-2">Withdraw money</h3>
            <p class="page-subtitle mb-0">Move funds from your account when you need them.</p>
          </div>
          @if (error) { <div class="alert alert-danger">{{ error }}</div> }
          @if (success) { <div class="alert alert-success">{{ success }}</div> }
          <form (ngSubmit)="onSubmit()">
            <div class="mb-3">
              <label class="form-label">Account</label>
              <select class="form-select" [(ngModel)]="accountNumber" name="accountNumber" required>
                <option value="">Select account...</option>
                @for (acc of accounts; track acc.id) { <option [value]="acc.accountNumber">{{ acc.accountNumber }} ({{ acc.balance | currency }})</option> }
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Amount</label>
              <input type="number" class="form-control" [(ngModel)]="amount" name="amount" required min="0.01" step="0.01">
            </div>
            <div class="mb-3">
              <label class="form-label">Description (optional)</label>
              <input type="text" class="form-control" [(ngModel)]="description" name="description">
            </div>
            <button type="submit" class="btn btn-warning w-100 text-white" [disabled]="loading">{{ loading ? 'Processing...' : 'Withdraw funds' }}</button>
          </form>
          <a routerLink="/dashboard" class="btn btn-link mt-3 px-0">Back to dashboard</a>
        </div>
      </div>
    </div>
  `
})
export class WithdrawComponent implements OnInit {
  accounts: AccountResponse[] = [];
  accountNumber = ''; amount = 0; description = ''; loading = false; error = ''; success = '';

  constructor(private accountService: AccountService, private txnService: TransactionService, private router: Router) {}
  ngOnInit() { this.accountService.getMyAccounts().subscribe(data => this.accounts = data); }

  onSubmit() {
    this.loading = true; this.error = ''; this.success = '';
    this.txnService.withdraw({ accountNumber: this.accountNumber, amount: this.amount, description: this.description || undefined })
      .subscribe({ next: (res) => { this.success = `Withdrew ${this.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}. Ref: ${res.referenceNumber}`; this.loading = false; }, error: (err) => { this.error = err.error?.message || 'Withdrawal failed'; this.loading = false; } });
  }
}
