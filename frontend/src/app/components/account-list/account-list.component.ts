import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { AccountResponse } from '../../models/account.model';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-grid">
      <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
        <div>
          <h2 class="page-title">My accounts</h2>
          <p class="page-subtitle">Keep track of each account and its current balance.</p>
        </div>
        <a routerLink="/create-account" class="btn btn-primary">+ Open account</a>
      </div>

      @if (loading) {
        <div class="state-card loading-skeleton">
          <div class="placeholder-line"></div>
          <div class="placeholder-line short"></div>
        </div>
      }

      @if (!loading && errorMessage) {
        <div class="state-card state-card-warning">{{ errorMessage }}</div>
      }

      @if (!loading && !errorMessage) {
        @for (acc of accounts; track acc.id) {
          <div class="card modern-card mb-3">
            <div class="card-body d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div>
                <div class="fw-bold">{{ acc.accountNumber }}</div>
                <div class="mt-1">
                  <span class="badge bg-info-subtle text-info-emphasis">{{ acc.type }}</span>
                  <span class="badge bg-success-subtle text-success-emphasis ms-1">{{ acc.status }}</span>
                </div>
              </div>
              <div class="text-end">
                <div class="fw-bold fs-5">{{ acc.balance | currency:'USD' }}</div>
                <a [routerLink]="['/accounts', acc.accountNumber]" class="btn btn-outline-primary btn-sm mt-2">View details</a>
              </div>
            </div>
          </div>
        } @empty {
          <div class="summary-card">No accounts found yet. Create your first account to get started.</div>
        }
      }
    </div>
  `
})
export class AccountListComponent implements OnInit {
  accounts: AccountResponse[] = [];
  loading = true;
  errorMessage = '';

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accountService.getMyAccounts().pipe(
      catchError(() => {
        this.errorMessage = 'We could not load your accounts right now.';
        return of([] as AccountResponse[]);
      })
    ).subscribe(data => {
      this.accounts = data;
      this.loading = false;
    });
  }
}
