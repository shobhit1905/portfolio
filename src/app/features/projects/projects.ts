import {
  Component,
  computed,
  inject,
  signal,
  AfterViewInit,
  OnDestroy,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { PortfolioService } from '../../core/services/portfolio.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Project } from '../../core/models/portfolio.models';

const CATEGORY_CLASSES: Record<string, string> = {
  Frontend: 'tag-frontend',
  Backend: 'tag-backend',
  AI: 'tag-ai',
  'Data Engineering': 'tag-data',
  DevOps: 'tag-devops',
};

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('filterBtn') filterBtns!: QueryList<ElementRef<HTMLButtonElement>>;

  private readonly portfolioService = inject(PortfolioService);
  protected readonly projects = toSignal(this.portfolioService.getProjects(), {
    initialValue: [] as Project[],
  });

  protected readonly filters = ['All', 'Frontend', 'Backend', 'AI', 'Data Engineering'];
  protected readonly activeFilter = signal('All');
  protected readonly selectedProject = signal<Project | null>(null);

  protected indicatorLeft = 0;
  protected indicatorWidth = 0;

  protected readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    const all = this.projects() ?? [];
    if (filter === 'All') return all;
    return all.filter((p) => p.categories.includes(filter));
  });

  private keyListener = (e: KeyboardEvent) => {
    if (e.key === 'Escape') this.closeModal();
  };

  ngAfterViewInit(): void {
    this.filterBtns.changes.subscribe(() => this.updateIndicator(0));
    setTimeout(() => this.updateIndicator(0));
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.keyListener);
  }

  setFilter(filter: string, index: number): void {
    this.activeFilter.set(filter);
    this.updateIndicator(index);
  }

  private updateIndicator(index: number): void {
    const btn = this.filterBtns.toArray()[index]?.nativeElement;
    if (!btn) return;
    const bar = btn.closest('.filter-bar') as HTMLElement;
    if (!bar) return;
    const btnRect = btn.getBoundingClientRect();
    const barRect = bar.getBoundingClientRect();
    this.indicatorLeft = btnRect.left - barRect.left;
    this.indicatorWidth = btnRect.width;
  }

  openModal(project: Project): void {
    this.selectedProject.set(project);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this.keyListener);
  }

  closeModal(): void {
    this.selectedProject.set(null);
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this.keyListener);
  }

  getTagClass(tech: string): string {
    for (const [cat, cls] of Object.entries(CATEGORY_CLASSES)) {
      if (tech.toLowerCase().includes(cat.toLowerCase().split(' ')[0])) return cls;
    }
    return 'tag-default';
  }

  getCategoryClass(cat: string): string {
    return CATEGORY_CLASSES[cat] ?? 'tag-default';
  }
}
