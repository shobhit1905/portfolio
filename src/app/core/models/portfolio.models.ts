export interface Stat {
  label: string;
  value: string;
}

export interface Meta {
  name: string;
  initials: string;
  tagline: string;
  availableForWork: boolean;
  resumeUrl: string;
  email: string;
  linkedin: string;
  github: string;
  visitorCount: number;
  stats: Stat[];
  roles: string[];
}

export interface TimelineItem {
  id: number;
  year: string;
  title: string;
  org: string;
  description: string;
}

export interface TechItem {
  name: string;
  category: string;
}

export interface About {
  paragraphs: string[];
  timeline: TimelineItem[];
  techStack: TechItem[];
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  technologies: string[];
  categories: string[];
  role: string;
  featured: boolean;
  order: number;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  id: number;
  category: string;
  icon: string;
  skills: Skill[];
}

export interface Experience {
  id: number;
  period: string;
  type: string;
  title: string;
  company: string;
  location: string;
  current: boolean;
  highlights: string[];
}

export interface Message {
  name: string;
  email: string;
  message: string;
  sentAt: string;
  read: boolean;
}
