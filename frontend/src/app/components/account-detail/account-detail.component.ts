import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';
import { AccountResponse } from '../../models/account.model';
import { TransactionResponse } from '../../models/transaction.model';

@Component({
  selector: 'app-account-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-grid">
      @if (account) {
        <div class="card modern-card">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-start flex-wrap gap-3">
              <div>
                <h3 class="mb-2">{{ account.accountNumber }}</h3>
                <p class="page-subtitle mb-0">{{ account.type }} account • {{ account.status }}</p>
              </div>
              <div class="summary-card p-3">
                <h6>Current balance</h6>
                <div class="value">{{ account.balance | currency:'USD' }}</div>
              </div>
            </div>
            <p class="text-muted mt-3 mb-4">Owner: {{ account.ownerName }} • Created: {{ account.createdAt | date }}</p>
            <div class="btn-group flex-wrap gap-2">
              <a routerLink="/deposit" class="btn btn-success">Deposit</a>
              <a routerLink="/withdraw" class="btn btn-warning text-white">Withdraw</a>
              <a routerLink="/transfer" class="btn btn-info text-white">Transfer</a>
            </div>
          </div>
        </div>

        <div class="card modern-card">
          <div class="card-header py-3">
            <h5 class="mb-0">Transaction history</h5>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table align-middle">
                <thead><tr><th>Ref</th><th>Type</th><th>Amount</th><th>Description</th><th>Date</th></tr></thead>
                <tbody>
                  @for (txn of transactions; track txn.id) {
                    <tr>
                      <td><small>{{ txn.referenceNumber }}</small></td>
                      <td><span class="badge bg-{{txn.type === 'DEPOSIT' ? 'success' : txn.type === 'WITHDRAWAL' ? 'danger' : 'info'}}">{{ txn.type }}</span></td>
                      <td>{{ txn.amount | currency:'USD' }}</td>
                      <td>{{ txn.description }}</td>
                      <td>{{ txn.createdAt | date:'medium' }}</td>
                    </tr>
                  } @empty {
                    <tr><td colspan="5" class="text-center text-muted py-4">No transactions yet</td></tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class AccountDetailComponent implements OnInit {
  account?: AccountResponse;
  transactions: TransactionResponse[] = [];

  constructor(private route: ActivatedRoute, private accountService: AccountService, private txnService: TransactionService) {}

  ngOnInit() {
    const number = this.route.snapshot.params['accountNumber'];
    this.accountService.getAccount(number).subscribe(data => this.account = data);
    this.txnService.getHistory(number).subscribe(data => this.transactions = data);
  }
}
