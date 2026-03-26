import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, shareReplay } from 'rxjs';
import { Meta, About, Project, SkillCategory, Experience, Message } from '../models/portfolio.models';

const BASE = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly http = inject(HttpClient);

  getMeta(): Observable<Meta | null> {
    return this.http.get<Meta>(`${BASE}/meta`).pipe(
      shareReplay(1),
      catchError(() => of(null))
    );
  }

  getAbout(): Observable<About | null> {
    return this.http.get<About>(`${BASE}/about`).pipe(
      shareReplay(1),
      catchError(() => of(null))
    );
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${BASE}/projects`).pipe(
      shareReplay(1),
      catchError(() => of([]))
    );
  }

  getSkills(): Observable<SkillCategory[]> {
    return this.http.get<SkillCategory[]>(`${BASE}/skills`).pipe(
      shareReplay(1),
      catchError(() => of([]))
    );
  }

  getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${BASE}/experience`).pipe(
      shareReplay(1),
      catchError(() => of([]))
    );
  }

  sendMessage(payload: Pick<Message, 'name' | 'email' | 'message'>): Observable<Message> {
    return this.http.post<Message>(`${BASE}/messages`, {
      ...payload,
      sentAt: new Date().toISOString(),
      read: false,
    });
  }
}
