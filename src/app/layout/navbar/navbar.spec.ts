import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from './navbar';
import { ThemeService } from '../../core/services/theme.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    localStorage.clear();
    document.body.classList.remove('light-theme');

    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
    document.body.classList.remove('light-theme');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 navigation links', () => {
    expect(component['navLinks'].length).toBe(6);
  });

  it('should contain expected nav paths', () => {
    const paths = component['navLinks'].map((l: any) => l.path);
    expect(paths).toContain('/');
    expect(paths).toContain('/about');
    expect(paths).toContain('/projects');
    expect(paths).toContain('/skills');
    expect(paths).toContain('/experience');
    expect(paths).toContain('/contact');
  });

  describe('onScroll()', () => {
    it('should set isScrolled to true when scrollY > 50', () => {
      spyOnProperty(window, 'scrollY', 'get').and.returnValue(100);
      component.onScroll();
      expect(component['isScrolled']()).toBeTrue();
    });

    it('should set isScrolled to false when scrollY <= 50', () => {
      spyOnProperty(window, 'scrollY', 'get').and.returnValue(30);
      component.onScroll();
      expect(component['isScrolled']()).toBeFalse();
    });

    it('should set isScrolled to false when scrollY is exactly 50', () => {
      spyOnProperty(window, 'scrollY', 'get').and.returnValue(50);
      component.onScroll();
      expect(component['isScrolled']()).toBeFalse();
    });
  });

  describe('toggleMobileMenu()', () => {
    it('should open mobile menu when closed', () => {
      expect(component['isMobileMenuOpen']()).toBeFalse();
      component.toggleMobileMenu();
      expect(component['isMobileMenuOpen']()).toBeTrue();
    });

    it('should close mobile menu when open', () => {
      component.toggleMobileMenu(); // open
      component.toggleMobileMenu(); // close
      expect(component['isMobileMenuOpen']()).toBeFalse();
    });
  });

  describe('closeMobileMenu()', () => {
    it('should close mobile menu', () => {
      component.toggleMobileMenu(); // open
      component.closeMobileMenu();
      expect(component['isMobileMenuOpen']()).toBeFalse();
    });

    it('should be safe to call when already closed', () => {
      component.closeMobileMenu();
      expect(component['isMobileMenuOpen']()).toBeFalse();
    });
  });

  describe('toggleTheme()', () => {
    it('should delegate to ThemeService.toggle()', () => {
      const themeService = TestBed.inject(ThemeService);
      spyOn(themeService, 'toggle');
      component.toggleTheme();
      expect(themeService.toggle).toHaveBeenCalled();
    });
  });
});
