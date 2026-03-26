import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 16 tech stack items', () => {
    expect(component['techStack'].length).toBe(16);
  });

  it('should have Angular in tech stack', () => {
    const angular = component['techStack'].find((t: any) => t.name === 'Angular');
    expect(angular).toBeTruthy();
    expect(angular!.category).toBe('Frontend');
  });

  it('should have 2 timeline entries', () => {
    expect(component['timeline'].length).toBe(2);
  });

  it('should have all tech items with name and category', () => {
    component['techStack'].forEach((tech: any) => {
      expect(tech.name).toBeTruthy();
      expect(tech.category).toBeTruthy();
    });
  });

  it('should have all timeline entries with required fields', () => {
    component['timeline'].forEach((entry: any) => {
      expect(entry.year).toBeTruthy();
      expect(entry.title).toBeTruthy();
      expect(entry.org).toBeTruthy();
      expect(entry.description).toBeTruthy();
    });
  });
});
