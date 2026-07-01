import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { User } from '../../models/user.model';
import { AccountResponse } from '../../models/account.model';
import { TransactionResponse } from '../../models/transaction.model';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-grid">
      <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
        <div>
          <h2 class="page-title">Admin panel</h2>
          <p class="page-subtitle">Monitor users, accounts, and transactions from one place.</p>
        </div>
      </div>

      <div class="card modern-card">
        <div class="card-body">
          <ul class="nav nav-tabs mb-3">
            <li class="nav-item"><button class="nav-link" [class.active]="tab === 'users'" (click)="tab = 'users'">Users</button></li>
            <li class="nav-item"><button class="nav-link" [class.active]="tab === 'accounts'" (click)="tab = 'accounts'">Accounts</button></li>
            <li class="nav-item"><button class="nav-link" [class.active]="tab === 'transactions'" (click)="tab = 'transactions'">Transactions</button></li>
          </ul>

          @if (tab === 'users') {
            <div class="table-responsive">
              <table class="table align-middle">
                <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Enabled</th><th>Action</th></tr></thead>
                <tbody>
                  @for (u of users; track u.id) {
                    <tr><td>{{ u.id }}</td><td>{{ u.firstName }} {{ u.lastName }}</td><td>{{ u.email }}</td><td>{{ u.role }}</td>
                      <td><span class="badge bg-{{ u.enabled ? 'success' : 'danger' }}">{{ u.enabled ? 'Yes' : 'No' }}</span></td>
                      <td><button class="btn btn-sm btn-warning text-white" (click)="toggleUser(u.id)">Toggle</button></td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }

          @if (tab === 'accounts') {
            <div class="table-responsive">
              <table class="table align-middle">
                <thead><tr><th>Number</th><th>Owner</th><th>Type</th><th>Balance</th><th>Status</th></tr></thead>
                <tbody>
                  @for (acc of allAccounts; track acc.id) {
                    <tr><td>{{ acc.accountNumber }}</td><td>{{ acc.ownerName }}</td><td>{{ acc.type }}</td><td>{{ acc.balance | currency:'USD' }}</td>
                      <td><span class="badge bg-{{ acc.status === 'ACTIVE' ? 'success' : 'danger' }}">{{ acc.status }}</span></td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }

          @if (tab === 'transactions') {
            <div class="table-responsive">
              <table class="table align-middle">
                <thead><tr><th>Ref</th><th>Type</th><th>Amount</th><th>Description</th><th>Date</th></tr></thead>
                <tbody>
                  @for (txn of allTransactions; track txn.id) {
                    <tr><td><small>{{ txn.referenceNumber }}</small></td>
                      <td><span class="badge bg-{{ txn.type === 'DEPOSIT' ? 'success' : txn.type === 'WITHDRAWAL' ? 'danger' : 'info' }}">{{ txn.type }}</span></td>
                      <td>{{ txn.amount | currency:'USD' }}</td><td>{{ txn.description }}</td><td>{{ txn.createdAt | date:'medium' }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class AdminPanelComponent implements OnInit {
  tab: 'users' | 'accounts' | 'transactions' = 'users';
  users: User[] = []; allAccounts: AccountResponse[] = []; allTransactions: TransactionResponse[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getUsers().subscribe(data => this.users = data);
    this.adminService.getAllAccounts().subscribe(data => this.allAccounts = data);
    this.adminService.getAllTransactions().subscribe(data => this.allTransactions = data);
  }

  toggleUser(id: number) {
    this.adminService.toggleUserEnabled(id).subscribe(() => {
      this.adminService.getUsers().subscribe(data => this.users = data);
    });
  }
}
