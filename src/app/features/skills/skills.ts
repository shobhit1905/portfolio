import {
  Component,
  inject,
  signal,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { PortfolioService } from '../../core/services/portfolio.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { SkillCategory } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ringsSection') ringsSection!: ElementRef<HTMLDivElement>;

  private readonly portfolioService = inject(PortfolioService);
  protected readonly categories = toSignal(this.portfolioService.getSkills(), {
    initialValue: [] as SkillCategory[],
  });
  protected readonly ringsVisible = signal(false);

  readonly circumference = 2 * Math.PI * 36; // ≈ 226.2

  private ringsObserver!: IntersectionObserver;
  private barsObserver!: IntersectionObserver;

  ngAfterViewInit(): void {
    this.setupRingsObserver();
    this.setupBarsObserver();
  }

  ngOnDestroy(): void {
    this.ringsObserver?.disconnect();
    this.barsObserver?.disconnect();
  }

  private setupRingsObserver(): void {
    this.ringsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.ringsVisible.set(true);
          this.ringsObserver.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (this.ringsSection?.nativeElement) {
      this.ringsObserver.observe(this.ringsSection.nativeElement);
    }
  }

  private setupBarsObserver(): void {
    this.barsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;
            const bars = card.querySelectorAll<HTMLElement>('.skill-progress');
            bars.forEach((bar, idx) => {
              const level = bar.getAttribute('data-level') ?? '0';
              setTimeout(() => {
                bar.style.width = level + '%';
              }, idx * 80);
            });
            this.barsObserver.unobserve(card);
          }
        });
      },
      { threshold: 0.25 }
    );
  }

  onCardVisible(el: HTMLElement): void {
    this.barsObserver.observe(el);
  }

  getAvgLevel(cat: SkillCategory): number {
    if (!cat.skills.length) return 0;
    return Math.round(cat.skills.reduce((s, k) => s + k.level, 0) / cat.skills.length);
  }

  getSkillLabel(level: number): string {
    if (level >= 85) return 'Expert';
    if (level >= 75) return 'Advanced';
    if (level >= 60) return 'Proficient';
    return 'Familiar';
  }

  getRingOffset(level: number): number {
    return this.circumference * (1 - level / 100);
  }
}
