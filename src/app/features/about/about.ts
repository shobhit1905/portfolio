import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface TechItem {
  name: string;
  category: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  protected readonly techStack: TechItem[] = [
    { name: 'Angular', category: 'Frontend' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Java', category: 'Language' },
    { name: 'Python', category: 'Language' },
    { name: 'Spring Boot', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'MySQL', category: 'Database' },
    { name: 'C++', category: 'Language' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Git', category: 'Tool' },
    { name: 'REST APIs', category: 'Backend' },
    { name: 'Databricks', category: 'Data' },
    { name: 'Generative AI', category: 'AI/ML' },
    { name: 'Autogen', category: 'AI/ML' },
    { name: 'Podman', category: 'DevOps' },
    { name: 'SQL', category: 'Language' },
  ];

  protected readonly timeline = [
    {
      year: 'Nov 2025 - Present',
      title: 'Software Development Engineer',
      org: 'HashedIn by Deloitte',
      description: 'Working as Frontend Developer using Angular, building enterprise applications.',
    },
    {
      year: 'Jul 2025 - Sep 2025',
      title: 'Software Development Intern',
      org: 'HashedIn by Deloitte',
      description: 'Completed 3 months of intensive training covering full-stack development.',
    },
  ];
}
