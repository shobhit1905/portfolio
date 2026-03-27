import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, shareReplay } from 'rxjs';
import { Meta, About, Project, SkillCategory, Experience, Message } from '../models/portfolio.models';

// Replace YOUR_FORM_ID with your Formspree form ID (https://formspree.io)
const FORMSPREE_URL = 'https://formspree.io/f/xaqlnavn';

interface DbJson {
  meta: Meta;
  about: About;
  projects: Project[];
  skills: SkillCategory[];
  experience: Experience[];
}

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly http = inject(HttpClient);

  private readonly db$ = this.http.get<DbJson>('/db.json').pipe(shareReplay(1));

  getMeta(): Observable<Meta | null> {
    return this.db$.pipe(
      map((db) => db.meta),
      catchError(() => of(null))
    );
  }

  getAbout(): Observable<About | null> {
    return this.db$.pipe(
      map((db) => db.about),
      catchError(() => of(null))
    );
  }

  getProjects(): Observable<Project[]> {
    return this.db$.pipe(
      map((db) => db.projects),
      catchError(() => of([]))
    );
  }

  getSkills(): Observable<SkillCategory[]> {
    return this.db$.pipe(
      map((db) => db.skills),
      catchError(() => of([]))
    );
  }

  getExperience(): Observable<Experience[]> {
    return this.db$.pipe(
      map((db) => db.experience),
      catchError(() => of([]))
    );
  }

  sendMessage(payload: Pick<Message, 'name' | 'email' | 'message'>): Observable<Message> {
    return this.http.post<Message>(FORMSPREE_URL, payload);
  }
}
