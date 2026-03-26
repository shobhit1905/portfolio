import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FooterComponent } from './footer';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have currentYear set to this year', () => {
    expect(component['currentYear']).toBe(new Date().getFullYear());
  });

  it('should have 3 social links', () => {
    expect(component['socialLinks'].length).toBe(3);
  });

  it('should have GitHub social link', () => {
    const github = component['socialLinks'].find((l: any) => l.label === 'GitHub');
    expect(github).toBeTruthy();
    expect(github!.url).toContain('github.com');
  });

  it('should have LinkedIn social link', () => {
    const linkedin = component['socialLinks'].find((l: any) => l.label === 'LinkedIn');
    expect(linkedin).toBeTruthy();
    expect(linkedin!.url).toContain('linkedin.com');
  });

  it('should have Email social link', () => {
    const email = component['socialLinks'].find((l: any) => l.label === 'Email');
    expect(email).toBeTruthy();
    expect(email!.url).toContain('mailto:');
  });
});
