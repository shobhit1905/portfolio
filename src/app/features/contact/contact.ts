import { Component, inject, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { PortfolioService } from '../../core/services/portfolio.service';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, ScrollRevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent {
  protected readonly contactForm: FormGroup;
  protected readonly submitState = signal<SubmitState>('idle');

  protected readonly contactInfo = [
    {
      icon: 'email',
      label: 'Email',
      value: 'snautiyal2021@gmail.com',
      href: 'mailto:snautiyal2021@gmail.com',
    },
    {
      icon: 'linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/shobhit1905',
      href: 'https://www.linkedin.com/in/shobhit1905/',
    },
    {
      icon: 'github',
      label: 'GitHub',
      value: 'github.com/shobhit1905',
      href: 'https://github.com/shobhit1905',
    },
  ];

  private readonly portfolioService = inject(PortfolioService);
  private readonly fb = inject(FormBuilder);

  readonly maxChars = 500;

  protected readonly messageLength = computed(() => {
    const val = this.contactForm?.get('message')?.value ?? '';
    return (val as string).length;
  });

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submitState.set('loading');
    const startTime = Date.now();
    const minDelay = 700;

    this.portfolioService.sendMessage(this.contactForm.value).subscribe({
      next: () => {
        const remaining = Math.max(0, minDelay - (Date.now() - startTime));
        setTimeout(() => {
          this.submitState.set('success');
          this.contactForm.reset();
          setTimeout(() => this.submitState.set('idle'), 3500);
        }, remaining);
      },
      error: () => {
        const remaining = Math.max(0, minDelay - (Date.now() - startTime));
        setTimeout(() => {
          this.submitState.set('error');
          setTimeout(() => this.submitState.set('idle'), 3500);
        }, remaining);
      },
    });
  }
}
