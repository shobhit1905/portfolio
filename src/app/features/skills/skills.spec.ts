import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsComponent } from './skills';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 5 skill categories', () => {
    expect(component['categories'].length).toBe(5);
  });

  it('should have Frontend category', () => {
    const frontend = component['categories'].find((c: any) => c.title === 'Frontend');
    expect(frontend).toBeTruthy();
    expect(frontend!.skills.length).toBe(4);
  });

  it('should have Backend category', () => {
    const backend = component['categories'].find((c: any) => c.title === 'Backend');
    expect(backend).toBeTruthy();
    expect(backend!.skills.length).toBe(5);
  });

  it('should have AI / ML category', () => {
    const ai = component['categories'].find((c: any) => c.title === 'AI / ML');
    expect(ai).toBeTruthy();
  });

  it('should have Data Engineering category', () => {
    const de = component['categories'].find((c: any) => c.title === 'Data Engineering');
    expect(de).toBeTruthy();
  });

  it('should have Tools & DevOps category', () => {
    const tools = component['categories'].find((c: any) => c.title === 'Tools & DevOps');
    expect(tools).toBeTruthy();
    expect(tools!.skills.length).toBe(6);
  });

  it('should have skill levels between 0 and 100', () => {
    component['categories'].forEach((cat: any) => {
      cat.skills.forEach((skill: any) => {
        expect(skill.level).toBeGreaterThanOrEqual(0);
        expect(skill.level).toBeLessThanOrEqual(100);
      });
    });
  });

  it('should have non-empty skill names', () => {
    component['categories'].forEach((cat: any) => {
      cat.skills.forEach((skill: any) => {
        expect(skill.name.length).toBeGreaterThan(0);
      });
    });
  });

  it('should have an icon for each category', () => {
    component['categories'].forEach((cat: any) => {
      expect(cat.icon).toBeTruthy();
    });
  });
});
