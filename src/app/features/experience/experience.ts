import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface Experience {
  title: string;
  company: string;
  period: string;
  type: string;
  highlights: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class ExperienceComponent {
  protected readonly experiences: Experience[] = [
    {
      title: 'Software Development Engineer',
      company: 'HashedIn by Deloitte',
      period: 'Nov 2025 - Present',
      type: 'Full-time',
      highlights: [
        'Building enterprise-grade frontend applications using Angular',
        'Developing responsive, accessible UI components with modern Angular features',
        'Collaborating with cross-functional teams on full-stack solutions',
        'Working with REST APIs, Spring Boot backends, and PostgreSQL databases',
        'Contributing to GenAI-powered platforms and multi-agent AI systems',
      ],
    },
    {
      title: 'Software Development Intern',
      company: 'HashedIn by Deloitte',
      period: 'Jul 2025 - Sep 2025',
      type: 'Internship',
      highlights: [
        'Completed 3 months of intensive full-stack development training',
        'Covered Angular, Spring Boot, databases, and cloud technologies',
        'Built end-to-end projects as part of the training curriculum',
        'Gained hands-on experience with enterprise development practices',
      ],
    },
  ];
}
