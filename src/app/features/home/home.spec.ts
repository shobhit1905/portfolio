import { ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    jasmine.clock().install();

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 roles defined', () => {
    expect(component['roles'].length).toBe(4);
  });

  it('should include expected roles', () => {
    expect(component['roles']).toContain('Software Development Engineer');
    expect(component['roles']).toContain('Full Stack Developer');
    expect(component['roles']).toContain('Angular Developer');
    expect(component['roles']).toContain('AI Enthusiast');
  });

  it('should start typing the first role', () => {
    jasmine.clock().tick(200);
    expect(component['displayText'].length).toBeGreaterThan(0);
  });

  it('should type characters progressively', () => {
    const firstRole = component['roles'][0];
    // Constructor already fires first typeEffect, so displayText starts with 1 char
    // Each 100ms tick adds another character
    const initialLen = component['displayText'].length;
    jasmine.clock().tick(100);
    expect(component['displayText'].length).toBe(initialLen + 1);
    jasmine.clock().tick(100);
    expect(component['displayText'].length).toBe(initialLen + 2);
  });

  it('should start deleting after full text is typed', () => {
    const firstRole = component['roles'][0];
    // Type entire first role
    jasmine.clock().tick(100 * firstRole.length);
    expect(component['displayText']).toBe(firstRole);

    // Wait for pause (2000ms) then start deleting
    jasmine.clock().tick(2000);
    jasmine.clock().tick(50);
    expect(component['displayText'].length).toBeLessThan(firstRole.length);
  });

  it('should eventually cycle to next role', () => {
    const firstRole = component['roles'][0];
    // Type remaining chars of first role (constructor already typed 1)
    const remaining = firstRole.length - component['displayText'].length;
    jasmine.clock().tick(100 * remaining);
    expect(component['displayText']).toBe(firstRole);

    // Pause + delete all characters
    jasmine.clock().tick(2000);
    jasmine.clock().tick(50 * firstRole.length);
    // After deletion completes, displayText should be empty
    expect(component['displayText']).toBe('');
  });
});
