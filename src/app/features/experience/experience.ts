import { Component, inject } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { PortfolioService } from '../../core/services/portfolio.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Experience } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class ExperienceComponent {
  private readonly portfolioService = inject(PortfolioService);
  protected readonly experiences = toSignal(
    this.portfolioService.getExperience(),
    { initialValue: [] as Experience[] }
  );

  getInitials(company: string): string {
    return company
      .split(' ')
      .filter((w) => w.length > 2)
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();
  }
}
