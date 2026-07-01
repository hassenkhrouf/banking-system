import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="page-content" [class.page-content--full]="isLanding">
      <div [class.container]="!isLanding" [class.py-4]="!isLanding">
        <router-outlet />
      </div>
    </main>
  `
})
export class AppComponent implements OnInit {
  isLanding = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateLayout(this.router.url);
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.updateLayout(e.urlAfterRedirects));
  }

  private updateLayout(url: string) {
    this.isLanding = url === '/' || url === '';
  }
}
