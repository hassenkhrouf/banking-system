import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { BANK_NAME } from '../../constants';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg sticky-top">
      <div class="container" [class.container-fluid]="isLanding" [class.px-lg-5]="isLanding">
        <a class="navbar-brand d-flex align-items-center gap-2" [routerLink]="isLoggedIn ? '/dashboard' : '/'">
          <span class="brand-mark">N</span>
          <span>{{ bankName }}</span>
        </a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto align-items-center gap-lg-1">
            @if (showThemeToggle) {
              <li class="nav-item">
                <button class="btn btn-outline-secondary btn-sm theme-toggle" (click)="toggleTheme()" type="button">
                  {{ isDarkMode ? '☀️ Light' : '🌙 Dark' }}
                </button>
              </li>
            }
            @if (isLoggedIn) {
              <li class="nav-item"><a class="nav-link" routerLink="/dashboard">Dashboard</a></li>
              <li class="nav-item"><a class="nav-link" routerLink="/accounts">Accounts</a></li>
              <li class="nav-item"><a class="nav-link" routerLink="/create-account">Open Account</a></li>
              @if (isAdmin) {
                <li class="nav-item"><a class="nav-link" routerLink="/admin">Admin</a></li>
              }
              <li class="nav-item"><button class="btn btn-primary btn-sm ms-2" (click)="logout()">Logout</button></li>
            } @else {
              @if (isLanding) {
                <li class="nav-item"><a class="nav-link" href="#features">Features</a></li>
                <li class="nav-item"><a class="nav-link" href="#security">Security</a></li>
              }
              <li class="nav-item"><a class="nav-link" routerLink="/login">Login</a></li>
              <li class="nav-item">
                <a class="btn btn-primary btn-sm ms-lg-2" routerLink="/register">Get started</a>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .brand-mark {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.2rem;
      height: 2.2rem;
      border-radius: 50%;
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      color: #fff;
      font-size: 0.95rem;
      font-weight: 800;
    }
  `]
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  isDarkMode = false;
  showThemeToggle = false;
  isLanding = false;
  bankName = BANK_NAME;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.updateThemeForRoute(this.router.url);

    this.authService.auth$.subscribe(auth => {
      this.isLoggedIn = auth;
      this.isAdmin = this.authService.isAdmin();
      this.updateThemeForRoute(this.router.url);
    });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.updateThemeForRoute(event.urlAfterRedirects);
    });
  }

  toggleTheme() {
    this.applyTheme(this.isDarkMode ? 'light' : 'dark');
  }

  logout() {
    this.authService.logout();
    window.location.href = '/login';
  }

  private updateThemeForRoute(url: string): void {
    const route = url.split('?')[0];
    const publicRoutes = ['/', '/login', '/register'];
    const publicRoute = publicRoutes.includes(route);

    this.isLanding = route === '/' || route === '';
    this.showThemeToggle = !publicRoute && this.isLoggedIn;

    if (publicRoute) {
      this.applyTheme('light');
    } else {
      this.applyTheme(this.getStoredTheme() ?? 'light');
    }
  }

  private applyTheme(theme: 'dark' | 'light' | null) {
    const resolvedTheme = theme === 'dark' ? 'dark' : 'light';
    this.isDarkMode = resolvedTheme === 'dark';
    document.documentElement.setAttribute('data-theme', resolvedTheme);
    localStorage.setItem('northstar-theme', resolvedTheme);
  }

  private getStoredTheme(): 'dark' | 'light' | null {
    const storedTheme = localStorage.getItem('northstar-theme');
    return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : null;
  }
}
