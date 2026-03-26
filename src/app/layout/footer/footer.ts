import { Component, inject, signal, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class FooterComponent implements AfterViewInit, OnDestroy {
  protected readonly currentYear = new Date().getFullYear();
  protected readonly visitorDisplay = signal(0);
  protected readonly socialLinks = [
    { label: 'GitHub', url: 'https://github.com/shobhit1905', icon: 'github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/shobhit1905/', icon: 'linkedin' },
    { label: 'Email', url: 'mailto:snautiyal2021@gmail.com', icon: 'email' },
  ];

  private readonly portfolioService = inject(PortfolioService);
  private observer!: IntersectionObserver;

  ngAfterViewInit(): void {
    const footer = document.querySelector('app-footer') as HTMLElement;
    if (!footer) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.portfolioService.getMeta().subscribe((meta) => {
            if (meta?.visitorCount) this.animateCount(meta.visitorCount);
          });
          this.observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    this.observer.observe(footer);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private animateCount(target: number): void {
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.visitorDisplay.set(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}
