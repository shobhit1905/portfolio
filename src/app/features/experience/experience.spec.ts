import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienceComponent } from './experience';

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 2 experiences', () => {
    expect(component['experiences'].length).toBe(2);
  });

  it('should have SDE as first experience', () => {
    expect(component['experiences'][0].title).toBe('Software Development Engineer');
  });

  it('should have intern as second experience', () => {
    expect(component['experiences'][1].title).toBe('Software Development Intern');
  });

  it('should have highlights for each experience', () => {
    component['experiences'].forEach((exp: any) => {
      expect(exp.highlights.length).toBeGreaterThan(0);
    });
  });

  it('should have company name for each experience', () => {
    component['experiences'].forEach((exp: any) => {
      expect(exp.company).toBeTruthy();
    });
  });

  it('should have period for each experience', () => {
    component['experiences'].forEach((exp: any) => {
      expect(exp.period).toBeTruthy();
    });
  });

  it('should have type for each experience', () => {
    component['experiences'].forEach((exp: any) => {
      expect(exp.type).toBeTruthy();
    });
  });
});
