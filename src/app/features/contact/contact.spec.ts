import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 contact info items', () => {
    expect(component['contactInfo'].length).toBe(3);
  });

  describe('form validation', () => {
    it('should initialize with invalid form', () => {
      expect(component['contactForm'].valid).toBeFalse();
    });

    it('should require name', () => {
      const name = component['contactForm'].get('name');
      expect(name?.errors?.['required']).toBeTruthy();
    });

    it('should require name minimum length of 2', () => {
      const name = component['contactForm'].get('name');
      name?.setValue('A');
      expect(name?.errors?.['minlength']).toBeTruthy();

      name?.setValue('Ab');
      expect(name?.errors?.['minlength']).toBeFalsy();
    });

    it('should require email', () => {
      const email = component['contactForm'].get('email');
      expect(email?.errors?.['required']).toBeTruthy();
    });

    it('should validate email format', () => {
      const email = component['contactForm'].get('email');
      email?.setValue('invalid-email');
      expect(email?.errors?.['email']).toBeTruthy();

      email?.setValue('valid@email.com');
      expect(email?.errors).toBeNull();
    });

    it('should require message', () => {
      const message = component['contactForm'].get('message');
      expect(message?.errors?.['required']).toBeTruthy();
    });

    it('should require message minimum length of 10', () => {
      const message = component['contactForm'].get('message');
      message?.setValue('short');
      expect(message?.errors?.['minlength']).toBeTruthy();

      message?.setValue('This is long enough');
      expect(message?.errors?.['minlength']).toBeFalsy();
    });

    it('should be valid when all fields are correctly filled', () => {
      component['contactForm'].setValue({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message that is long enough',
      });
      expect(component['contactForm'].valid).toBeTrue();
    });
  });

  describe('onSubmit()', () => {
    it('should not submit when form is invalid', () => {
      component.onSubmit();
      expect(component['isSubmitted']()).toBeFalse();
    });

    it('should mark all fields as touched on invalid submit', () => {
      component.onSubmit();
      expect(component['contactForm'].get('name')?.touched).toBeTrue();
      expect(component['contactForm'].get('email')?.touched).toBeTrue();
      expect(component['contactForm'].get('message')?.touched).toBeTrue();
    });

    it('should submit when form is valid', () => {
      component['contactForm'].setValue({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message that is long enough',
      });
      component.onSubmit();
      expect(component['isSubmitted']()).toBeTrue();
    });

    it('should reset form after valid submit', () => {
      component['contactForm'].setValue({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message text',
      });
      component.onSubmit();
      expect(component['contactForm'].get('name')?.value).toBeNull();
      expect(component['contactForm'].get('email')?.value).toBeNull();
      expect(component['contactForm'].get('message')?.value).toBeNull();
    });

    it('should reset isSubmitted after 5 seconds', fakeAsync(() => {
      component['contactForm'].setValue({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message text',
      });
      component.onSubmit();
      expect(component['isSubmitted']()).toBeTrue();

      tick(5000);
      expect(component['isSubmitted']()).toBeFalse();
    }));
  });
});
