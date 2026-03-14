import { Component, signal, computed } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  categories: string[];
  role: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class ProjectsComponent {
  protected readonly filters = ['All', 'Frontend', 'Backend', 'AI', 'Data Engineering'];
  protected readonly activeFilter = signal('All');

  protected readonly projects: Project[] = [
    {
      title: 'LearnSphere',
      description: 'Full Stack E-Learning Platform',
      longDescription:
        'A Udemy-like platform with course management, instructor dashboard, student enrollments, authentication, REST APIs, and modular backend architecture.',
      technologies: ['Spring Boot', 'Angular', 'MySQL', 'JPA/Hibernate', 'REST APIs', 'Spring Security'],
      categories: ['Frontend', 'Backend'],
      role: 'Full Stack Developer',
    },
    {
      title: 'GenAI Multi-Agent Code Generator',
      description: 'AI-Powered Application Code Generator',
      longDescription:
        'A system where users upload a BRD and multiple AI agents collaborate to generate frontend code, backend code, and architecture. The final result is downloadable production-ready application code.',
      technologies: ['Python', 'Autogen', 'Generative AI', 'LLM Agents'],
      categories: ['AI'],
      role: 'AI Developer',
    },
    {
      title: 'InterviewLens',
      description: 'GenAI Campus Interview Platform',
      longDescription:
        'A platform that automates candidate evaluation, AI interview assistance, and structured candidate analysis. Solves the challenge campus ambassadors face organizing large-scale interviews.',
      technologies: ['Python', 'PostgreSQL', 'Autogen', 'Podman'],
      categories: ['AI', 'Backend'],
      role: 'Backend Developer',
    },
    {
      title: 'Databricks ETL Pipeline',
      description: 'Scalable Data Processing Pipeline',
      longDescription:
        'Built Bronze, Silver, and Gold data layers using Medallion Architecture. Features scalable data processing and transformation pipelines with PySpark on Databricks.',
      technologies: ['Databricks', 'PySpark', 'Medallion Architecture', 'SQL'],
      categories: ['Data Engineering'],
      role: 'Data Engineer',
    },
  ];

  protected readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'All') return this.projects;
    return this.projects.filter((p) => p.categories.includes(filter));
  });

  setFilter(filter: string): void {
    this.activeFilter.set(filter);
  }
}
