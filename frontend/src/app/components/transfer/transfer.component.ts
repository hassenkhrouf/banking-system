import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';
import { AccountResponse } from '../../models/account.model';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  template: `
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-8">
        <div class="card modern-card p-4 p-lg-5">
          <div class="mb-4">
            <h3 class="mb-2">Transfer funds</h3>
            <p class="page-subtitle mb-0">Securely move money between accounts in moments.</p>
          </div>
          @if (error) { <div class="alert alert-danger">{{ error }}</div> }
          @if (success) { <div class="alert alert-success">{{ success }}</div> }
          <form (ngSubmit)="onSubmit()">
            <div class="mb-3">
              <label class="form-label">From account</label>
              <select class="form-select" [(ngModel)]="fromAccountNumber" name="fromAccountNumber" required>
                <option value="">Select source account...</option>
                @for (acc of accounts; track acc.id) { <option [value]="acc.accountNumber">{{ acc.accountNumber }} ({{ acc.balance | currency }})</option> }
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">To account number</label>
              <input type="text" class="form-control" [(ngModel)]="toAccountNumber" name="toAccountNumber" required placeholder="e.g. ACC-2026-XXXXXX">
            </div>
            <div class="mb-3">
              <label class="form-label">Amount</label>
              <input type="number" class="form-control" [(ngModel)]="amount" name="amount" required min="0.01" step="0.01">
            </div>
            <div class="mb-3">
              <label class="form-label">Description (optional)</label>
              <input type="text" class="form-control" [(ngModel)]="description" name="description">
            </div>
            <button type="submit" class="btn btn-info w-100 text-white" [disabled]="loading">{{ loading ? 'Processing...' : 'Transfer funds' }}</button>
          </form>
          <a routerLink="/dashboard" class="btn btn-link mt-3 px-0">Back to dashboard</a>
        </div>
      </div>
    </div>
  `
})
export class TransferComponent implements OnInit {
  accounts: AccountResponse[] = [];
  fromAccountNumber = ''; toAccountNumber = ''; amount = 0; description = ''; loading = false; error = ''; success = '';

  constructor(private accountService: AccountService, private txnService: TransactionService, private router: Router) {}
  ngOnInit() { this.accountService.getMyAccounts().subscribe(data => this.accounts = data); }

  onSubmit() {
    this.loading = true; this.error = ''; this.success = '';
    if (!this.fromAccountNumber || !this.toAccountNumber || !this.amount) { this.error = 'All fields are required'; this.loading = false; return; }
    if (!/^ACC-\d{4}-\d{6}$/.test(this.toAccountNumber)) { this.error = 'Invalid account number format (e.g. ACC-2026-XXXXXX)'; this.loading = false; return; }
    if (this.fromAccountNumber === this.toAccountNumber) { this.error = 'Cannot transfer to the same account'; this.loading = false; return; }
    this.txnService.transfer({ fromAccountNumber: this.fromAccountNumber, toAccountNumber: this.toAccountNumber, amount: this.amount, description: this.description || undefined })
      .subscribe({ next: (res) => { this.success = `Transferred ${this.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}. Ref: ${res.referenceNumber}`; this.loading = false; }, error: (err) => { this.error = err.error?.message || 'Transfer failed'; this.loading = false; } });
  }
}
