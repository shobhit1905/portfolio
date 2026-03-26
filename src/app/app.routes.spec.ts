import { routes } from './app.routes';

describe('App Routes', () => {
  it('should have routes defined', () => {
    expect(routes.length).toBeGreaterThan(0);
  });

  it('should have home route at empty path', () => {
    const homeRoute = routes.find((r) => r.path === '');
    expect(homeRoute).toBeTruthy();
    expect(homeRoute!.loadComponent).toBeDefined();
  });

  it('should have about route', () => {
    const route = routes.find((r) => r.path === 'about');
    expect(route).toBeTruthy();
  });

  it('should have projects route', () => {
    const route = routes.find((r) => r.path === 'projects');
    expect(route).toBeTruthy();
  });

  it('should have skills route', () => {
    const route = routes.find((r) => r.path === 'skills');
    expect(route).toBeTruthy();
  });

  it('should have experience route', () => {
    const route = routes.find((r) => r.path === 'experience');
    expect(route).toBeTruthy();
  });

  it('should have contact route', () => {
    const route = routes.find((r) => r.path === 'contact');
    expect(route).toBeTruthy();
  });

  it('should have wildcard route redirecting to home', () => {
    const wildcard = routes.find((r) => r.path === '**');
    expect(wildcard).toBeTruthy();
    expect(wildcard!.redirectTo).toBe('');
  });

  it('should have 7 routes total', () => {
    expect(routes.length).toBe(7);
  });

  it('should lazy-load all feature components', () => {
    const lazyRoutes = routes.filter((r) => r.loadComponent);
    expect(lazyRoutes.length).toBe(6);
  });
});
