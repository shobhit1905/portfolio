import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class FooterComponent {
  protected readonly currentYear = new Date().getFullYear();

  protected readonly socialLinks = [
    { label: 'GitHub', url: 'https://github.com/shobhit1905', icon: 'github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/shobhit1905/', icon: 'linkedin' },
    { label: 'Email', url: 'mailto:shobhit@example.com', icon: 'email' },
  ];
}
