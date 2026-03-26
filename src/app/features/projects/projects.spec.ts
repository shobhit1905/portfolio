import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 5 filter options', () => {
    expect(component['filters'].length).toBe(5);
  });

  it('should include "All" as first filter', () => {
    expect(component['filters'][0]).toBe('All');
  });

  it('should have 4 projects', () => {
    expect(component['projects'].length).toBe(4);
  });

  describe('filtering', () => {
    it('should default to "All" filter', () => {
      expect(component['activeFilter']()).toBe('All');
    });

    it('should show all projects when filter is "All"', () => {
      expect(component['filteredProjects']().length).toBe(4);
    });

    it('should filter by Frontend category', () => {
      component.setFilter('Frontend');
      const filtered = component['filteredProjects']();
      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach((p: any) => {
        expect(p.categories).toContain('Frontend');
      });
    });

    it('should filter by Backend category', () => {
      component.setFilter('Backend');
      const filtered = component['filteredProjects']();
      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach((p: any) => {
        expect(p.categories).toContain('Backend');
      });
    });

    it('should filter by AI category', () => {
      component.setFilter('AI');
      const filtered = component['filteredProjects']();
      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach((p: any) => {
        expect(p.categories).toContain('AI');
      });
    });

    it('should filter by Data Engineering category', () => {
      component.setFilter('Data Engineering');
      const filtered = component['filteredProjects']();
      expect(filtered.length).toBe(1);
      expect(filtered[0].title).toBe('Databricks ETL Pipeline');
    });

    it('should return empty array for non-matching filter', () => {
      component.setFilter('Mobile');
      expect(component['filteredProjects']().length).toBe(0);
    });

    it('should update filtered results when filter changes', () => {
      component.setFilter('AI');
      const aiCount = component['filteredProjects']().length;

      component.setFilter('All');
      expect(component['filteredProjects']().length).toBe(4);
      expect(component['filteredProjects']().length).toBeGreaterThan(aiCount);
    });
  });

  describe('project data integrity', () => {
    it('should have technologies for every project', () => {
      component['projects'].forEach((p: any) => {
        expect(p.technologies.length).toBeGreaterThan(0);
      });
    });

    it('should have categories for every project', () => {
      component['projects'].forEach((p: any) => {
        expect(p.categories.length).toBeGreaterThan(0);
      });
    });

    it('should have a role for every project', () => {
      component['projects'].forEach((p: any) => {
        expect(p.role).toBeTruthy();
      });
    });
  });
});
