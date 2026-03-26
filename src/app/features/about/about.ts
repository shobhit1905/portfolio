import { Component, computed, inject, signal } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { PortfolioService } from '../../core/services/portfolio.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { About } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  private readonly portfolioService = inject(PortfolioService);
  protected readonly about = toSignal<About | null>(this.portfolioService.getAbout(), {
    initialValue: null,
  });

  protected readonly activeCategory = signal('All');

  protected readonly categories = computed(() => {
    const stack = this.about()?.techStack ?? [];
    return ['All', ...new Set(stack.map((t) => t.category))];
  });

  protected readonly filteredTech = computed(() => {
    const stack = this.about()?.techStack ?? [];
    const cat = this.activeCategory();
    return cat === 'All' ? stack : stack.filter((t) => t.category === cat);
  });

  readonly categoryColors: Record<string, string> = {
    Frontend: 'cat-frontend',
    Backend: 'cat-backend',
    Language: 'cat-language',
    Database: 'cat-database',
    DevOps: 'cat-devops',
    Data: 'cat-data',
    'AI/ML': 'cat-ai',
    Tool: 'cat-tool',
  };

  getCategoryClass(category: string): string {
    return this.categoryColors[category] ?? 'cat-default';
  }
}
