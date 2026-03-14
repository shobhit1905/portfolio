import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class SkillsComponent {
  protected readonly categories: SkillCategory[] = [
    {
      title: 'Frontend',
      icon: 'layout',
      skills: [
        { name: 'Angular', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'HTML/CSS', level: 90 },
        { name: 'TailwindCSS', level: 80 },
      ],
    },
    {
      title: 'Backend',
      icon: 'server',
      skills: [
        { name: 'Spring Boot', level: 85 },
        { name: 'Java', level: 85 },
        { name: 'REST APIs', level: 90 },
        { name: 'JPA/Hibernate', level: 80 },
        { name: 'Spring Security', level: 75 },
      ],
    },
    {
      title: 'AI / ML',
      icon: 'brain',
      skills: [
        { name: 'Python', level: 80 },
        { name: 'Generative AI', level: 75 },
        { name: 'Autogen', level: 75 },
        { name: 'LLM Agents', level: 70 },
      ],
    },
    {
      title: 'Data Engineering',
      icon: 'database',
      skills: [
        { name: 'PostgreSQL', level: 80 },
        { name: 'MySQL', level: 85 },
        { name: 'Databricks', level: 70 },
        { name: 'PySpark', level: 65 },
        { name: 'ETL Pipelines', level: 70 },
      ],
    },
    {
      title: 'Tools & DevOps',
      icon: 'tool',
      skills: [
        { name: 'Git', level: 85 },
        { name: 'Docker/Podman', level: 70 },
        { name: 'VS Code', level: 90 },
        { name: 'IntelliJ', level: 80 },
        { name: 'Postman', level: 85 },
        { name: 'Maven', level: 75 },
      ],
    },
  ];
}
