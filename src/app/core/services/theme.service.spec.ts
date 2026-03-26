import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    document.body.classList.remove('light-theme');
  });

  afterEach(() => {
    localStorage.clear();
    document.body.classList.remove('light-theme');
  });

  describe('initialization', () => {
    it('should default to dark theme', () => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(ThemeService);
      expect(service.isDark()).toBeTrue();
      expect(document.body.classList.contains('light-theme')).toBeFalse();
    });

    it('should restore light theme from localStorage', () => {
      localStorage.setItem('portfolio-theme', 'light');
      TestBed.configureTestingModule({});
      service = TestBed.inject(ThemeService);
      expect(service.isDark()).toBeFalse();
      expect(document.body.classList.contains('light-theme')).toBeTrue();
    });

    it('should stay dark when localStorage has "dark"', () => {
      localStorage.setItem('portfolio-theme', 'dark');
      TestBed.configureTestingModule({});
      service = TestBed.inject(ThemeService);
      expect(service.isDark()).toBeTrue();
      expect(document.body.classList.contains('light-theme')).toBeFalse();
    });
  });

  describe('toggle()', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(ThemeService);
    });

    it('should switch from dark to light', () => {
      service.toggle();
      expect(service.isDark()).toBeFalse();
      expect(document.body.classList.contains('light-theme')).toBeTrue();
      expect(localStorage.getItem('portfolio-theme')).toBe('light');
    });

    it('should switch from light back to dark', () => {
      service.toggle(); // dark -> light
      service.toggle(); // light -> dark
      expect(service.isDark()).toBeTrue();
      expect(document.body.classList.contains('light-theme')).toBeFalse();
      expect(localStorage.getItem('portfolio-theme')).toBe('dark');
    });

    it('should persist theme across multiple toggles', () => {
      service.toggle();
      service.toggle();
      service.toggle();
      expect(service.isDark()).toBeFalse();
      expect(localStorage.getItem('portfolio-theme')).toBe('light');
    });
  });
});
