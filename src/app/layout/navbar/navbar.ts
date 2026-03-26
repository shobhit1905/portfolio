import { Component, inject, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  protected readonly theme = inject(ThemeService);
  protected readonly isScrolled = signal(false);
  protected readonly isMobileMenuOpen = signal(false);
  protected readonly scrollProgress = signal(0);

  protected readonly navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/skills', label: 'Skills' },
    { path: '/experience', label: 'Experience' },
    { path: '/contact', label: 'Contact' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
    const total = document.body.scrollHeight - window.innerHeight;
    this.scrollProgress.set(total > 0 ? (window.scrollY / total) * 100 : 0);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
    document.body.style.overflow = this.isMobileMenuOpen() ? 'hidden' : '';
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
    document.body.style.overflow = '';
  }

  toggleTheme(): void {
    this.theme.toggle();
  }
}
