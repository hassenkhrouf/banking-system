import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrl: './landing.component.css',
  template: `
    <div class="lp" [class.lp--reduced-motion]="prefersReducedMotion" #lpRoot>

      <!-- Particle canvas background -->
      <canvas class="lp-particles" #particleCanvas></canvas>

      <!-- Ambient gradient orbs -->
      <div class="lp-orbs" aria-hidden="true">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
      </div>

      <!-- ======================== HERO ======================== -->
      <section class="lp-hero" #heroSection>
        <div class="lp-hero-inner">
          <div class="lp-hero-text">
            <div class="lp-hero-eyebrow" #heroEyebrow>
              <span class="eyebrow-pulse"></span>
              Trusted by 10,000+ businesses worldwide
            </div>
            <h1 class="lp-hero-title" #heroTitle>
              Banking that<br>
              <span class="lp-hero-rotating" #rotatingWord>{{ words[0] }}</span>
            </h1>
            <p class="lp-hero-desc" #heroDesc>
              From startups to enterprises — manage cash flow, access credit, and grow faster with modern financial tools built for your business.
            </p>
            <div class="lp-hero-actions" #heroActions>
              <a routerLink="/register" class="lp-btn lp-btn-primary">
                <span>Get started free</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
              <a routerLink="/login" class="lp-btn lp-btn-outline">
                Sign in
              </a>
            </div>
            <div class="lp-hero-trust" #heroTrust>
              <div class="trust-avatars">
                <div class="trust-av" style="--c:#3b82f6">J</div>
                <div class="trust-av" style="--c:#8b5cf6">S</div>
                <div class="trust-av" style="--c:#ec4899">M</div>
                <div class="trust-av" style="--c:#f59e0b">A</div>
              </div>
              <div class="trust-text">
                <strong>4.9/5</strong> rating from <span>2,400+</span> reviews
              </div>
            </div>
          </div>

          <!-- Dashboard Mockup -->
          <div class="lp-hero-visual" #heroVisual>
            <div class="mock-shell">
              <div class="mock-topbar">
                <div class="mock-dots">
                  <span></span><span></span><span></span>
                </div>
                <div class="mock-url">app.northstar.bank/dashboard</div>
              </div>
              <div class="mock-body">
                <div class="mock-sidebar">
                  <div class="mock-sb-item active"></div>
                  <div class="mock-sb-item"></div>
                  <div class="mock-sb-item"></div>
                  <div class="mock-sb-item"></div>
                </div>
                <div class="mock-content">
                  <div class="mock-header-bar">
                    <div class="mock-hb-line w60"></div>
                    <div class="mock-hb-line w30"></div>
                  </div>
                  <div class="mock-metrics">
                    <div class="mock-metric">
                      <div class="mock-metric-val" #counter1>$0</div>
                      <div class="mock-metric-label">Total Balance</div>
                      <div class="mock-metric-trend up">+12.5%</div>
                    </div>
                    <div class="mock-metric">
                      <div class="mock-metric-val" #counter2>$0</div>
                      <div class="mock-metric-label">Monthly Revenue</div>
                      <div class="mock-metric-trend up">+8.2%</div>
                    </div>
                    <div class="mock-metric">
                      <div class="mock-metric-val" #counter3>0</div>
                      <div class="mock-metric-label">Transactions</div>
                      <div class="mock-metric-trend up">+24%</div>
                    </div>
                  </div>
                  <div class="mock-chart">
                    <svg class="mock-sparkline" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.3"/>
                          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
                        </linearGradient>
                      </defs>
                      <path class="spark-area" d="M0 55 L20 45 L40 48 L60 30 L80 35 L100 20 L120 25 L140 15 L160 18 L180 10 L200 12 L200 60 L0 60Z" fill="url(#sparkGrad)"/>
                      <path class="spark-line" d="M0 55 L20 45 L40 48 L60 30 L80 35 L100 20 L120 25 L140 15 L160 18 L180 10 L200 12" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <!-- Floating badges around mockup -->
            <div class="mock-float mf-top">
              <div class="mf-icon mf-icon-green">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <span>Payment secured</span>
            </div>
            <div class="mock-float mf-right">
              <div class="mf-icon mf-icon-blue">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <span>256-bit encrypted</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ======================== LOGOS ======================== -->
      <section class="lp-logos" #logosSection aria-label="Trusted partners">
        <p class="lp-logos-label">Trusted by industry leaders</p>
        <div class="lp-logos-marquee" aria-hidden="true">
          <div class="lp-logos-track">
            <div class="lp-logo-item" *ngFor="let logo of partnerLogos"><span>{{ logo }}</span></div>
            <div class="lp-logo-item" *ngFor="let logo of partnerLogos"><span>{{ logo }}</span></div>
          </div>
        </div>
      </section>

      <!-- ======================== HOW IT WORKS ======================== -->
      <section class="lp-steps" aria-label="How it works">
        <div class="lp-section-head">
          <span class="lp-eyebrow">Simple onboarding</span>
          <h2 class="lp-section-title">Up and running in minutes</h2>
        </div>
        <div class="lp-steps-grid">
          <div class="lp-step" *ngFor="let step of steps; let i = index">
            <div class="lp-step-num">{{ i + 1 }}</div>
            <h5>{{ step.title }}</h5>
            <p>{{ step.desc }}</p>
          </div>
        </div>
      </section>

      <!-- ======================== FEATURES ======================== -->
      <section class="lp-features" id="features" #featuresSection aria-label="Product features">
        <div class="lp-section-head">
          <span class="lp-eyebrow">Everything you need</span>
          <h2 class="lp-section-title">Built for modern businesses</h2>
          <p class="lp-section-desc">Powerful financial tools designed to help you manage, grow, and scale with confidence.</p>
        </div>
        <div class="lp-features-grid">
          <div class="lp-feature-card" *ngFor="let f of features" #featureCard>
            <div class="lp-fc-icon" [ngStyle]="{background: f.bg, color: f.color}">
              <svg [attr.width]="28" [attr.height]="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" [innerHTML]="f.svg"></svg>
            </div>
            <h5>{{ f.title }}</h5>
            <p>{{ f.desc }}</p>
          </div>
        </div>
      </section>

      <!-- ======================== TESTIMONIALS ======================== -->
      <section class="lp-testimonials" #testimonialsSection aria-label="Customer testimonials">
        <div class="lp-section-head">
          <span class="lp-eyebrow">What customers say</span>
          <h2 class="lp-section-title">Loved by growing teams</h2>
        </div>
        <div class="lp-testimonials-grid">
          <blockquote class="lp-testimonial" *ngFor="let t of testimonials">
            <p>"{{ t.quote }}"</p>
            <footer>
              <div class="lp-t-avatar" [style.background]="t.color">{{ t.initials }}</div>
              <div>
                <strong>{{ t.name }}</strong>
                <span>{{ t.role }}</span>
              </div>
            </footer>
          </blockquote>
        </div>
      </section>

      <!-- ======================== SECURITY ======================== -->
      <section class="lp-security" id="security" #securitySection aria-label="Security">
        <div class="lp-security-grid">
          <div class="lp-security-copy">
            <span class="lp-eyebrow">Protect your business</span>
            <h2 class="lp-section-title">Enterprise-grade security, <span class="text-gradient">built for every stage.</span></h2>
            <p>Our platform helps you detect threats early, secure transactions, and keep operations running smoothly with modern protection built for business banking.</p>
            <ul class="lp-check-list">
              <li *ngFor="let item of securityItems">
                <span class="lp-check">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                {{ item }}
              </li>
            </ul>
            <a routerLink="/login" class="lp-btn lp-btn-outline">Learn about security</a>
          </div>
          <div class="lp-security-visual">
            <div class="lp-sec-glow"></div>
            <div class="lp-sec-card sc-1">
              <div class="sc-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div class="sc-body">
                <strong>Fraud detection</strong>
                <span>AI-powered real-time monitoring</span>
              </div>
            </div>
            <div class="lp-sec-card sc-2">
              <div class="sc-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <div class="sc-body">
                <strong>Secure approvals</strong>
                <span>Contextual risk signals</span>
              </div>
            </div>
            <div class="lp-sec-card sc-3">
              <div class="sc-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <div class="sc-body">
                <strong>100% uptime SLA</strong>
                <span>Enterprise reliability</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ======================== CTA ======================== -->
      <section class="lp-cta" #ctaSection aria-label="Get started">
        <div class="lp-cta-glow"></div>
        <div class="lp-cta-content">
          <h2>Ready to transform your<br><span class="text-gradient">business banking?</span></h2>
          <p>Join thousands of businesses that trust Northstar Bank.<br>No hidden fees. No surprises. Just results.</p>
          <a routerLink="/register" class="lp-btn lp-btn-primary lp-btn-lg">
            <span>Open your free account</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </section>

      <!-- ======================== FOOTER ======================== -->
      <footer class="lp-footer" aria-label="Site footer">
        <div class="lp-footer-grid">
          <div class="lp-footer-brand">
            <div class="lp-footer-logo">
              <span class="brand-mark">N</span>
              <strong>Northstar Bank</strong>
            </div>
            <p>Modern business banking for teams that move fast.</p>
          </div>
          <div class="lp-footer-col">
            <h6>Product</h6>
            <a href="#features">Features</a>
            <a href="#security">Security</a>
            <a routerLink="/register">Pricing</a>
          </div>
          <div class="lp-footer-col">
            <h6>Company</h6>
            <a routerLink="/login">About</a>
            <a routerLink="/login">Careers</a>
            <a routerLink="/login">Contact</a>
          </div>
          <div class="lp-footer-col">
            <h6>Legal</h6>
            <a routerLink="/login">Privacy Policy</a>
            <a routerLink="/login">Terms of Service</a>
            <a routerLink="/login">Compliance</a>
          </div>
        </div>
        <div class="lp-footer-bottom">
          <span>&copy; {{ currentYear }} Northstar Bank. All rights reserved.</span>
          <div class="lp-footer-actions">
            <a routerLink="/login">Sign in</a>
            <a routerLink="/register" class="lp-footer-cta">Get started</a>
          </div>
        </div>
      </footer>

    </div>
  `
})
export class LandingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('heroSection') heroRef!: ElementRef;
  @ViewChild('heroEyebrow') heroEyebrowRef!: ElementRef;
  @ViewChild('heroTitle') heroTitleRef!: ElementRef;
  @ViewChild('heroDesc') heroDescRef!: ElementRef;
  @ViewChild('heroActions') heroActionsRef!: ElementRef;
  @ViewChild('heroTrust') heroTrustRef!: ElementRef;
  @ViewChild('heroVisual') heroVisualRef!: ElementRef;
  @ViewChild('rotatingWord') rotatingWordRef!: ElementRef;
  @ViewChild('counter1') counter1Ref!: ElementRef;
  @ViewChild('counter2') counter2Ref!: ElementRef;
  @ViewChild('counter3') counter3Ref!: ElementRef;
  @ViewChild('logosSection') logosRef!: ElementRef;
  @ViewChild('featuresSection') featuresRef!: ElementRef;
  @ViewChild('securitySection') securityRef!: ElementRef;
  @ViewChild('ctaSection') ctaRef!: ElementRef;
  @ViewChild('testimonialsSection') testimonialsRef!: ElementRef;

  private platformId = inject(PLATFORM_ID);
  prefersReducedMotion = false;

  words = ['smarter.', 'faster.', 'secure.', 'modern.'];
  currentWord = 0;
  currentYear = new Date().getFullYear();

  partnerLogos = ['Stripe', 'Shopify', 'Notion', 'Linear', 'Vercel', 'Figma'];

  steps = [
    { title: 'Create your account', desc: 'Sign up in minutes with your business details — no branch visit required.' },
    { title: 'Verify your identity', desc: 'Secure KYC verification keeps your account protected from day one.' },
    { title: 'Start banking', desc: 'Open accounts, transfer funds, and track everything from your dashboard.' }
  ];

  testimonials = [
    { quote: 'Northstar cut our payment reconciliation time in half. The dashboard gives us clarity we never had before.', name: 'Sarah Chen', role: 'CFO, Bloom Studio', initials: 'SC', color: '#2563eb' },
    { quote: 'Opening a business account took less than ten minutes. Transfers are instant and fees are transparent.', name: 'Marcus Webb', role: 'Founder, Trailhead Co.', initials: 'MW', color: '#7c3aed' },
    { quote: 'Security alerts and approval workflows give our finance team real peace of mind at scale.', name: 'Elena Ruiz', role: 'VP Finance, Nova Labs', initials: 'ER', color: '#10b981' }
  ];

  features = [
    { title: 'Business Checking & Savings', desc: 'Flexible accounts that help you run payroll, manage cash flow, and grow with confidence.', bg: 'rgba(37,99,235,0.1)', color: '#2563eb', svg: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>' },
    { title: 'Credit & Lending Solutions', desc: 'Fast approvals and tailored terms to support expansion, equipment, and working capital.', bg: 'rgba(16,185,129,0.1)', color: '#10b981', svg: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>' },
    { title: 'Payments & Transfers', desc: 'Send and receive funds instantly with speed, low fees, and full visibility across all channels.', bg: 'rgba(236,72,153,0.1)', color: '#ec4899', svg: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>' },
    { title: 'Digital Tools & Insights', desc: 'Track budgets, forecast cash flow, and optimize spending with smart reporting dashboards.', bg: 'rgba(139,92,246,0.1)', color: '#7c3aed', svg: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>' },
    { title: 'Merchant & POS Services', desc: 'Integrated payment acceptance for in-store and online transactions with ease.', bg: 'rgba(245,158,11,0.1)', color: '#f59e0b', svg: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M8 12h8"/>' },
    { title: 'Business Support Team', desc: 'Dedicated experts available 24/7 to guide your financial strategy and keep you moving.', bg: 'rgba(6,182,212,0.1)', color: '#06b6d4', svg: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' }
  ];

  securityItems = [
    'Real-time fraud detection & alerts',
    'Contextual risk signals on every payment',
    'Multi-factor & biometric authentication',
    'SOC 2 certified & GDPR compliant'
  ];

  private destroyFns: (() => void)[] = [];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.prefersReducedMotion) {
      this.applyStaticState();
      return;
    }

    this.initParticles();
    this.animateHero();
    this.animateMockupCounters();
    this.animateLogos();
    this.animateFeatures();
    this.animateTestimonials();
    this.animateSecurity();
    this.animateCTA();

    ScrollTrigger.refresh();
  }

  ngOnDestroy() {
    this.destroyFns.forEach(fn => fn());
    ScrollTrigger.getAll().forEach(t => t.kill());
  }

  private applyStaticState() {
    const c1 = this.counter1Ref?.nativeElement;
    const c2 = this.counter2Ref?.nativeElement;
    const c3 = this.counter3Ref?.nativeElement;
    if (c1) c1.textContent = '$64,820';
    if (c2) c2.textContent = '$38,190';
    if (c3) c3.textContent = '1,284';

    const wordEl = this.rotatingWordRef?.nativeElement;
    if (wordEl) wordEl.textContent = this.words[0];
  }

  private animateTestimonials() {
    const section = this.testimonialsRef.nativeElement;
    gsap.from(section.querySelector('.lp-section-head'), {
      scrollTrigger: { trigger: section, start: 'top 80%' },
      y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
    });
    gsap.from(section.querySelectorAll('.lp-testimonial'), {
      scrollTrigger: { trigger: section, start: 'top 75%' },
      y: 50, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out'
    });
  }

  private animateHero() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(this.heroEyebrowRef.nativeElement, { y: 30, opacity: 0, duration: 0.8 })
      .from(this.heroTitleRef.nativeElement, { y: 50, opacity: 0, duration: 1 }, '-=0.5')
      .from(this.heroDescRef.nativeElement, { y: 30, opacity: 0, duration: 0.7 }, '-=0.6')
      .from(this.heroActionsRef.nativeElement, { y: 25, opacity: 0, duration: 0.6 }, '-=0.4')
      .from(this.heroTrustRef.nativeElement, { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
      .from(this.heroVisualRef.nativeElement, { x: 80, opacity: 0, duration: 1.2, ease: 'power4.out' }, '-=1.2');

    const wordEl = this.rotatingWordRef.nativeElement;
    const wordTl = gsap.timeline({ repeat: -1 });
    this.words.forEach((_, i) => {
      if (i === 0) {
        wordTl.to(wordEl, { duration: 2.5 });
      }
      wordTl.to(wordEl, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in', onComplete: () => {
        this.currentWord = (this.currentWord + 1) % this.words.length;
        wordEl.textContent = this.words[this.currentWord];
      }})
      .from(wordEl, { opacity: 0, y: 20, duration: 0.4, ease: 'power2.out' })
      .to(wordEl, { duration: 2.1 });
    });
  }

  private animateMockupCounters() {
    const c1 = this.counter1Ref?.nativeElement;
    const c2 = this.counter2Ref?.nativeElement;
    const c3 = this.counter3Ref?.nativeElement;
    if (!c1 || !c2 || !c3) return;

    const counter1 = { val: 0 };
    gsap.to(counter1, {
      val: 64820,
      duration: 2.5,
      delay: 1.2,
      ease: 'power2.out',
      onUpdate: () => {
        c1.textContent = '$' + Math.round(counter1.val).toLocaleString();
      }
    });
    const counter2 = { val: 0 };
    gsap.to(counter2, {
      val: 38190,
      duration: 2.5,
      delay: 1.4,
      ease: 'power2.out',
      onUpdate: () => {
        c2.textContent = '$' + Math.round(counter2.val).toLocaleString();
      }
    });
    const counter3 = { val: 0 };
    gsap.to(counter3, {
      val: 1284,
      duration: 2.5,
      delay: 1.6,
      ease: 'power2.out',
      onUpdate: () => {
        c3.textContent = Math.round(counter3.val).toLocaleString();
      }
    });
  }

  private animateLogos() {
    gsap.from(this.logosRef.nativeElement.querySelectorAll('.lp-logo-item'), {
      scrollTrigger: { trigger: this.logosRef.nativeElement, start: 'top 85%' },
      y: 30, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out'
    });
  }

  private animateFeatures() {
    const section = this.featuresRef.nativeElement;
    gsap.from(section.querySelector('.lp-section-head'), {
      scrollTrigger: { trigger: section, start: 'top 80%' },
      y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
    });
    gsap.from(section.querySelectorAll('.lp-feature-card'), {
      scrollTrigger: { trigger: section.querySelector('.lp-features-grid'), start: 'top 80%' },
      y: 60, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out'
    });
  }

  private animateSecurity() {
    const section = this.securityRef.nativeElement;
    gsap.from(section.querySelector('.lp-security-copy'), {
      scrollTrigger: { trigger: section, start: 'top 75%' },
      x: -60, opacity: 0, duration: 1, ease: 'power3.out'
    });
    gsap.from(section.querySelector('.lp-security-visual'), {
      scrollTrigger: { trigger: section, start: 'top 75%' },
      x: 60, opacity: 0, duration: 1, ease: 'power3.out'
    });
    gsap.from(section.querySelectorAll('.lp-sec-card'), {
      scrollTrigger: { trigger: section, start: 'top 60%' },
      y: 40, opacity: 0, stagger: 0.2, duration: 0.7, ease: 'power3.out'
    });
  }

  private animateCTA() {
    const section = this.ctaRef.nativeElement;
    gsap.from(section.querySelector('.lp-cta-content'), {
      scrollTrigger: { trigger: section, start: 'top 80%' },
      y: 50, opacity: 0, duration: 1, ease: 'power3.out'
    });
  }

  private initParticles() {
    if (this.prefersReducedMotion) return;

    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let mouseX = w / 2;
    let mouseY = h / 2;
    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const count = Math.min(50, Math.floor(w * h / 20000));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5
      });
    }

    const mouseHandler = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener('mousemove', mouseHandler);

    const resizeHandler = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeHandler);

    let running = true;
    const animate = () => {
      if (!running || document.hidden) {
        if (running) requestAnimationFrame(animate);
        return;
      }
      ctx.clearRect(0, 0, w, h);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          p.x -= dx * 0.002;
          p.y -= dy * 0.002;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37, 99, 235, 0.25)';
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.06 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };
    animate();

    this.destroyFns.push(() => {
      running = false;
      window.removeEventListener('mousemove', mouseHandler);
      window.removeEventListener('resize', resizeHandler);
    });
  }
}
