import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollRevealDirective } from './scroll-reveal.directive';

@Component({
  standalone: true,
  imports: [ScrollRevealDirective],
  template: '<div appScrollReveal>Test Content</div>',
})
class TestHostComponent {}

describe('ScrollRevealDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directiveEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    directiveEl = fixture.nativeElement.querySelector('[appScrollReveal]');
  });

  it('should create the host component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should set initial opacity to 0', () => {
    expect(directiveEl.style.opacity).toBe('0');
  });

  it('should set initial transform to translateY(30px)', () => {
    expect(directiveEl.style.transform).toBe('translateY(30px)');
  });

  it('should set transition style', () => {
    expect(directiveEl.style.transition).toContain('opacity');
    expect(directiveEl.style.transition).toContain('transform');
  });

  it('should clean up observer on destroy', () => {
    const spy = spyOn(IntersectionObserver.prototype, 'disconnect');
    fixture.destroy();
    expect(spy).toHaveBeenCalled();
  });
});
