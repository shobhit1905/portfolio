import { TestBed } from '@angular/core/testing';
import { ScrollService } from './scroll.service';

describe('ScrollService', () => {
  let service: ScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call scrollIntoView on existing element', () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'test-section';
    document.body.appendChild(mockElement);
    spyOn(mockElement, 'scrollIntoView');

    service.scrollTo('test-section');

    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });

    document.body.removeChild(mockElement);
  });

  it('should not throw when element does not exist', () => {
    expect(() => service.scrollTo('non-existent')).not.toThrow();
  });

  it('should not call scrollIntoView for non-existent element', () => {
    spyOn(document, 'getElementById').and.returnValue(null);
    expect(() => service.scrollTo('missing')).not.toThrow();
  });
});
