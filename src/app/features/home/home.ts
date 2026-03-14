import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  protected readonly roles = [
    'Software Development Engineer',
    'Full Stack Developer',
    'Angular Developer',
    'AI Enthusiast',
  ];
  protected currentRoleIndex = 0;
  protected displayText = '';
  private isDeleting = false;
  private loopNum = 0;

  constructor() {
    this.typeEffect();
  }

  private typeEffect(): void {
    const fullText = this.roles[this.loopNum % this.roles.length];
    if (this.isDeleting) {
      this.displayText = fullText.substring(0, this.displayText.length - 1);
    } else {
      this.displayText = fullText.substring(0, this.displayText.length + 1);
    }

    let delta = this.isDeleting ? 50 : 100;

    if (!this.isDeleting && this.displayText === fullText) {
      delta = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.displayText === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(() => this.typeEffect(), delta);
  }
}
