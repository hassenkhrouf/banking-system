import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { AuthService } from '../../services/auth.service';
import { TransactionService } from '../../services/transaction.service';
import { AccountResponse } from '../../models/account.model';
import { TransactionResponse } from '../../models/transaction.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrl: './dashboard.component.css',
  template: `
    <div class="dashboard-grid">
      <div class="hero-panel">
        <div class="d-flex justify-content-between align-items-start flex-wrap gap-3">
          <div>
            <div class="eyebrow">Your financial hub</div>
            <h2 class="mb-2">Welcome back, {{ userName || 'there' }}.</h2>
            <p class="mb-0 dash-hero-text">Everything you need to manage your money is right here, from account balances to transfers and account growth.</p>
          </div>
          <div class="stat-pill">
            <span>●</span>
            <span>Secure access</span>
          </div>
        </div>
      </div>

      @if (loading) {
        <div class="dash-skeleton-metrics">
          @for (i of [1, 2, 3]; track i) {
            <div class="dash-skeleton-block loading-skeleton">
              <div class="placeholder-line short"></div>
              <div class="placeholder-line"></div>
            </div>
          }
        </div>
        <div class="card modern-card">
          <div class="card-body loading-skeleton">
            <div class="placeholder-line short"></div>
            <div class="placeholder-line"></div>
            <div class="placeholder-line"></div>
          </div>
        </div>
      }

      @if (!loading && errorMessage) {
        <div class="state-card state-card-warning dash-error-card">
          <span>{{ errorMessage }}</span>
          <button type="button" class="btn btn-outline-primary btn-sm" (click)="retry()">Try again</button>
        </div>
      }

      @if (!loading && !errorMessage) {
        <div class="dash-metrics mb-2">
          <div class="metric-card">
            <div class="metric-label">Total balance</div>
            <div class="metric-value">{{ totalBalance | currency:'USD' }}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Active accounts</div>
            <div class="metric-value">{{ activeAccounts }}</div>
          </div>
          <div class="metric-card dash-metric-primary">
            <div class="metric-label">Primary account</div>
            <div class="metric-value">{{ primaryAccountLabel }}</div>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-lg-8">
            <div class="card modern-card dash-accounts-panel">
              <div class="card-header d-flex justify-content-between align-items-center py-3">
                <div>
                  <h5 class="mb-0">Your accounts</h5>
                  <p class="page-subtitle small mb-0">A quick view of your active balances</p>
                </div>
                <a routerLink="/create-account" class="btn btn-primary btn-sm">+ Open account</a>
              </div>
              <div class="card-body">
                @if (accounts.length === 0) {
                  <div class="summary-card">
                    <h6>No accounts yet</h6>
                    <p class="mb-0">Create your first account to start banking with Northstar.</p>
                    <a routerLink="/create-account" class="btn btn-primary btn-sm dash-empty-cta">Open your first account</a>
                  </div>
                } @else {
                  <div class="dash-account-list">
                    @for (acc of accounts; track acc.accountNumber) {
                      <a [routerLink]="['/accounts', acc.accountNumber]" class="dash-account-row">
                        <div class="dash-account-info">
                          <div class="dash-account-number">{{ maskAccountNumber(acc.accountNumber) }}</div>
                          <div class="dash-account-badges">
                            <span class="badge bg-info-subtle text-info-emphasis">{{ formatAccountType(acc.type) }}</span>
                            <span class="badge bg-success-subtle text-success-emphasis">{{ acc.status }}</span>
                          </div>
                        </div>
                        <div class="dash-account-balance">
                          <strong>{{ acc.balance | currency:'USD' }}</strong>
                          <span>View details →</span>
                        </div>
                      </a>
                    }
                  </div>
                }
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="dash-actions">
              <a routerLink="/deposit" class="dash-action-btn">
                <span class="dash-action-icon dash-action-icon--deposit" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
                </span>
                <span class="dash-action-copy">
                  <strong>Deposit</strong>
                  <span>Add funds quickly and securely</span>
                </span>
              </a>
              <a routerLink="/withdraw" class="dash-action-btn">
                <span class="dash-action-icon dash-action-icon--withdraw" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
                </span>
                <span class="dash-action-copy">
                  <strong>Withdraw</strong>
                  <span>Move money when you need it</span>
                </span>
              </a>
              <a routerLink="/transfer" class="dash-action-btn">
                <span class="dash-action-icon dash-action-icon--transfer" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                </span>
                <span class="dash-action-copy">
                  <strong>Transfer</strong>
                  <span>Send money between accounts</span>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div class="card modern-card">
          <div class="card-header py-3">
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div>
                <h5 class="mb-0">Recent activity</h5>
                <p class="page-subtitle small mb-0">Your latest transactions across all accounts</p>
              </div>
              @if (recentTransactions.length > 0) {
                <a routerLink="/accounts" class="btn btn-outline-primary btn-sm">View all</a>
              }
            </div>
          </div>
          <div class="card-body">
            @if (recentTransactions.length === 0) {
              <div class="summary-card">
                <h6>No recent activity</h6>
                <p class="mb-0">Transactions will appear here after your first deposit, withdrawal, or transfer.</p>
                @if (accounts.length > 0) {
                  <a routerLink="/deposit" class="btn btn-success btn-sm dash-empty-cta">Make a deposit</a>
                }
              </div>
            }
            @for (txn of recentTransactions; track txn.referenceNumber) {
              <a [routerLink]="['/accounts', getActivityAccount(txn)]" class="dash-activity-link">
                <span class="dash-activity-icon" [ngClass]="getActivityIconClass(txn.type)" aria-hidden="true">
                  @switch (txn.type?.toUpperCase()) {
                    @case ('DEPOSIT') {
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
                    }
                    @case ('WITHDRAW') {
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
                    }
                    @case ('TRANSFER') {
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                    }
                    @default {
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="4"/></svg>
                    }
                  }
                </span>
                <span class="dash-activity-main">
                  <span class="dash-activity-title">{{ txn.description || formatTxnType(txn.type) }}</span>
                  <span class="activity-meta d-block">{{ formatTxnType(txn.type) }} • {{ formatDate(txn.createdAt) }}</span>
                </span>
                <span class="dash-activity-amount" [class.positive]="isPositiveTransaction(txn)">
                  {{ getAmountPrefix(txn) }}{{ txn.amount | currency:'USD' }}
                </span>
              </a>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class DashboardComponent implements OnInit {
  accounts: AccountResponse[] = [];
  userName = '';
  loading = true;
  errorMessage = '';
  totalBalance = 0;
  activeAccounts = 0;
  primaryAccountLabel = '—';
  recentTransactions: TransactionResponse[] = [];
  private userAccountNumbers = new Set<string>();

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.loadDashboard();
  }

  retry() {
    this.loadDashboard();
  }

  private loadDashboard(): void {
    this.loading = true;
    this.errorMessage = '';

    forkJoin({
      accounts: this.accountService.getMyAccounts().pipe(
        catchError(() => {
          this.errorMessage = 'We could not load your accounts right now.';
          return of([] as AccountResponse[]);
        })
      ),
      profile: this.authService.getProfile().pipe(
        catchError(() => of(null as User | null))
      )
    }).subscribe(({ accounts, profile }) => {
      if (this.errorMessage) {
        this.loading = false;
        return;
      }

      this.accounts = [...(accounts || [])].sort((a, b) => (b.balance || 0) - (a.balance || 0));
      this.userAccountNumbers = new Set(this.accounts.map(acc => acc.accountNumber));
      this.totalBalance = this.accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);
      this.activeAccounts = this.accounts.filter(acc => acc.status?.toUpperCase() !== 'CLOSED').length;

      const primary = this.accounts[0];
      this.primaryAccountLabel = primary
        ? `${this.formatAccountType(primary.type)} ${this.maskAccountNumber(primary.accountNumber)}`
        : '—';

      this.userName = this.getDisplayName(profile);

      if (this.accounts.length === 0) {
        this.recentTransactions = [];
        this.loading = false;
        return;
      }

      const requests = this.accounts.map(acc =>
        this.transactionService.getHistory(acc.accountNumber).pipe(
          catchError(() => of([] as TransactionResponse[]))
        )
      );

      forkJoin(requests).subscribe(groups => {
        const seen = new Set<string>();
        this.recentTransactions = groups
          .flat()
          .filter(txn => {
            if (seen.has(txn.referenceNumber)) return false;
            seen.add(txn.referenceNumber);
            return true;
          })
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
        this.loading = false;
      });
    });
  }

  maskAccountNumber(accountNumber: string): string {
    if (!accountNumber || accountNumber.length <= 8) return accountNumber;
    return `${accountNumber.slice(0, 4)}-••••${accountNumber.slice(-4)}`;
  }

  formatAccountType(type: string): string {
    switch (type?.toUpperCase()) {
      case 'SAVINGS':
        return 'Savings';
      case 'CURRENT':
        return 'Checking';
      default:
        return type || 'Account';
    }
  }

  formatTxnType(type: string): string {
    switch (type?.toUpperCase()) {
      case 'DEPOSIT':
        return 'Deposit';
      case 'WITHDRAW':
        return 'Withdrawal';
      case 'TRANSFER':
        return 'Transfer';
      default:
        return type || 'Transaction';
    }
  }

  isPositiveTransaction(txn: TransactionResponse): boolean {
    const type = txn.type?.toUpperCase();
    if (type === 'DEPOSIT') return true;
    if (type === 'WITHDRAW') return false;
    if (type === 'TRANSFER') {
      const fromMine = txn.fromAccountNumber && this.userAccountNumbers.has(txn.fromAccountNumber);
      const toMine = txn.toAccountNumber && this.userAccountNumbers.has(txn.toAccountNumber);
      if (fromMine && !toMine) return false;
      if (toMine && !fromMine) return true;
      if (fromMine && toMine) return false;
    }
    return true;
  }

  getAmountPrefix(txn: TransactionResponse): string {
    return this.isPositiveTransaction(txn) ? '+' : '-';
  }

  getActivityAccount(txn: TransactionResponse): string {
    const type = txn.type?.toUpperCase();
    if (type === 'DEPOSIT' && txn.toAccountNumber) return txn.toAccountNumber;
    if (type === 'WITHDRAW' && txn.fromAccountNumber) return txn.fromAccountNumber;
    if (type === 'TRANSFER') {
      if (txn.fromAccountNumber && this.userAccountNumbers.has(txn.fromAccountNumber)) {
        return txn.fromAccountNumber;
      }
      if (txn.toAccountNumber) return txn.toAccountNumber;
    }
    return txn.toAccountNumber || txn.fromAccountNumber || this.accounts[0]?.accountNumber || '';
  }

  getActivityIconClass(type: string): string {
    switch (type?.toUpperCase()) {
      case 'DEPOSIT':
        return 'dash-activity-icon--deposit';
      case 'WITHDRAW':
        return 'dash-activity-icon--withdraw';
      case 'TRANSFER':
        return 'dash-activity-icon--transfer';
      default:
        return 'dash-activity-icon--default';
    }
  }

  private getDisplayName(profile: User | null): string {
    if (profile?.firstName) {
      return profile.firstName;
    }

    const storedEmail = localStorage.getItem('user_email');
    if (storedEmail) {
      return storedEmail.split('@')[0];
    }

    return 'there';
  }

  formatDate(value: string): string {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? 'Recently updated' : date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
}
