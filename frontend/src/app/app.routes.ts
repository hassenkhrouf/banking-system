import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/landing/landing.component').then(m => m.LandingComponent) },
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) },
  { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [authGuard] },
  { path: 'accounts', loadComponent: () => import('./components/account-list/account-list.component').then(m => m.AccountListComponent), canActivate: [authGuard] },
  { path: 'accounts/:accountNumber', loadComponent: () => import('./components/account-detail/account-detail.component').then(m => m.AccountDetailComponent), canActivate: [authGuard] },
  { path: 'create-account', loadComponent: () => import('./components/create-account/create-account.component').then(m => m.CreateAccountComponent), canActivate: [authGuard] },
  { path: 'deposit', loadComponent: () => import('./components/deposit/deposit.component').then(m => m.DepositComponent), canActivate: [authGuard] },
  { path: 'withdraw', loadComponent: () => import('./components/withdraw/withdraw.component').then(m => m.WithdrawComponent), canActivate: [authGuard] },
  { path: 'transfer', loadComponent: () => import('./components/transfer/transfer.component').then(m => m.TransferComponent), canActivate: [authGuard] },
  { path: 'admin', loadComponent: () => import('./components/admin-panel/admin-panel.component').then(m => m.AdminPanelComponent), canActivate: [authGuard, adminGuard] },
  { path: '**', redirectTo: '' }
];
