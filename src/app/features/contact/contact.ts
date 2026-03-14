import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, ScrollRevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent {
  protected readonly contactForm: FormGroup;
  protected readonly isSubmitted = signal(false);

  protected readonly contactInfo = [
    {
      icon: 'email',
      label: 'Email',
      value: 'shobhit@example.com',
      href: 'mailto:shobhit@example.com',
    },
    {
      icon: 'linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/shobhit',
      href: 'https://linkedin.com/in/',
    },
    {
      icon: 'github',
      label: 'GitHub',
      value: 'github.com/shobhit',
      href: 'https://github.com/',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitted.set(true);
      this.contactForm.reset();
      setTimeout(() => this.isSubmitted.set(false), 5000);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
