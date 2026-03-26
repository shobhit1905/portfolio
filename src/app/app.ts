import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  HostListener,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar';
import { FooterComponent } from './layout/footer/footer';
import { ToastService } from './core/services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <div class="cursor-glow" #cursorGlow></div>

    <app-navbar />
    <main>
      <router-outlet />
    </main>
    <app-footer />

    @if (toast.message()) {
      <div class="toast-bar">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <span>{{ toast.message() }}</span>
        <button (click)="toast.clear()" aria-label="Dismiss">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    }

    <button
      class="back-to-top"
      [class.visible]="showBackToTop"
      (click)="scrollToTop()"
      aria-label="Back to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
    </button>
  `,
  styles: `
    main {
      min-height: 100vh;
    }

    .cursor-glow {
      position: fixed;
      width: 320px;
      height: 320px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.1), transparent 70%);
      pointer-events: none;
      z-index: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
      will-change: transform, left, top;
    }

    @media (hover: none) {
      .cursor-glow { display: none; }
    }

    .toast-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(234, 179, 8, 0.97);
      color: #1a1200;
      padding: 0.7rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      z-index: 10000;
      font-size: 0.875rem;
      font-weight: 600;
      animation: toast-slide-in 0.3s ease-out;
    }

    .toast-bar span {
      flex: 1;
    }

    .toast-bar button {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      color: #1a1200;
      padding: 0.25rem;
      border-radius: 0.25rem;
      opacity: 0.7;
      transition: opacity 0.15s;
    }

    .toast-bar button:hover {
      opacity: 1;
    }

    @keyframes toast-slide-in {
      from { transform: translateY(-100%); }
      to { transform: translateY(0); }
    }

    .back-to-top {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: linear-gradient(135deg, #8b5cf6, #06b6d4);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      z-index: 998;
      opacity: 0;
      transform: translateY(16px);
      transition: opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
      box-shadow: 0 4px 15px rgba(139, 92, 246, 0.35);
      pointer-events: none;
    }

    .back-to-top.visible {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .back-to-top:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(139, 92, 246, 0.6);
    }
  `,
})
export class App implements AfterViewInit, OnDestroy {
  @ViewChild('cursorGlow') private glowRef!: ElementRef<HTMLDivElement>;

  protected readonly toast = inject(ToastService);
  protected showBackToTop = false;

  private targetX = 0;
  private targetY = 0;
  private currentX = 0;
  private currentY = 0;
  private rafId = 0;
  private readonly reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.targetX = e.clientX;
    this.targetY = e.clientY;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.showBackToTop = window.scrollY > 400;
  }

  ngAfterViewInit(): void {
    if (!this.reducedMotion) {
      this.animateCursor();
    } else {
      this.glowRef.nativeElement.style.display = 'none';
    }
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
  }

  private animateCursor(): void {
    this.currentX += (this.targetX - this.currentX) * 0.08;
    this.currentY += (this.targetY - this.currentY) * 0.08;
    const el = this.glowRef.nativeElement;
    el.style.left = `${this.currentX}px`;
    el.style.top = `${this.currentY}px`;
    this.rafId = requestAnimationFrame(() => this.animateCursor());
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
