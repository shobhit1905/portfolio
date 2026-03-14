import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'portfolio-theme';
  readonly isDark = signal(true);

  constructor() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'light') {
      this.isDark.set(false);
      document.body.classList.add('light-theme');
    }
  }

  toggle(): void {
    const dark = !this.isDark();
    this.isDark.set(dark);
    if (dark) {
      document.body.classList.remove('light-theme');
      localStorage.setItem(this.storageKey, 'dark');
    } else {
      document.body.classList.add('light-theme');
      localStorage.setItem(this.storageKey, 'light');
    }
  }
}
