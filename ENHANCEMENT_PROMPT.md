# Portfolio Enhancement Prompt

## Context

This is an Angular 20+ standalone-component portfolio app with:
- **Stack:** Angular 20, TypeScript 5.9, TailwindCSS 4, Angular Animations, Angular Signals
- **Pages:** Home, About, Projects, Skills, Experience, Contact
- **Styling:** CSS Variables with dark/light theme (purple `#8b5cf6` + cyan `#06b6d4` palette)
- **State:** Angular Signals + Reactive Forms
- **Build:** Vite via `@angular/build:application`
- **Currently:** All data is hardcoded inline in component `.ts` files. No backend. No `db.json`.

---

## Goal

Transform this portfolio into a **visually stunning, highly interactive, data-driven** showcase — while keeping it a pure frontend Angular app that reads from a local `db.json` via **json-server**.

---

## Part 1 — Backend: `db.json` + json-server

### 1.1 Install json-server

```bash
npm install --save-dev json-server
```

Add to `package.json` scripts:
```json
"server": "json-server --watch db.json --port 3000",
"dev": "concurrently \"npm run server\" \"npm run start\""
```

Also install concurrently:
```bash
npm install --save-dev concurrently
```

### 1.2 Create `db.json` at project root

The file must contain ALL data currently hardcoded in components. Structure it exactly as follows — do not omit any field:

```json
{
  "meta": {
    "name": "Shobhit Nautiyal",
    "initials": "SN",
    "tagline": "Building scalable software, one commit at a time.",
    "availableForWork": true,
    "resumeUrl": "/assets/resume.pdf",
    "email": "shobhit@example.com",
    "linkedin": "https://linkedin.com/in/shobhit1905",
    "github": "https://github.com/shobhit1905",
    "stats": [
      { "label": "Projects", "value": "4+" },
      { "label": "Technologies", "value": "5+" },
      { "label": "Current Role", "value": "SDE @ HashedIn" }
    ],
    "roles": [
      "Software Development Engineer",
      "Full Stack Developer",
      "Angular Developer",
      "AI Enthusiast"
    ]
  },
  "about": {
    "paragraphs": [
      "I'm a Software Development Engineer at HashedIn by Deloitte, passionate about building scalable, high-performance applications that solve real-world problems.",
      "My expertise spans the full stack — from crafting pixel-perfect Angular frontends to designing robust Spring Boot microservices and building AI-powered multi-agent systems.",
      "I thrive at the intersection of clean code and great UX, with a growing focus on GenAI, data engineering, and cloud-native development."
    ],
    "timeline": [
      {
        "id": 1,
        "year": "Nov 2025 – Present",
        "title": "Software Development Engineer",
        "org": "HashedIn by Deloitte",
        "description": "Building enterprise Angular frontends and GenAI-powered platforms."
      },
      {
        "id": 2,
        "year": "Jul 2025 – Sep 2025",
        "title": "Software Development Intern",
        "org": "HashedIn by Deloitte",
        "description": "Intensive full-stack training covering Angular, Spring Boot, databases, and cloud."
      }
    ],
    "techStack": [
      { "name": "Angular", "category": "Frontend" },
      { "name": "TypeScript", "category": "Frontend" },
      { "name": "Java", "category": "Language" },
      { "name": "Python", "category": "Language" },
      { "name": "Spring Boot", "category": "Backend" },
      { "name": "PostgreSQL", "category": "Database" },
      { "name": "MySQL", "category": "Database" },
      { "name": "C++", "category": "Language" },
      { "name": "Docker", "category": "DevOps" },
      { "name": "Git", "category": "Tool" },
      { "name": "REST APIs", "category": "Backend" },
      { "name": "Databricks", "category": "Data" },
      { "name": "Generative AI", "category": "AI/ML" },
      { "name": "Autogen", "category": "AI/ML" },
      { "name": "Podman", "category": "DevOps" },
      { "name": "SQL", "category": "Data" }
    ]
  },
  "projects": [
    {
      "id": 1,
      "title": "LearnSphere",
      "subtitle": "Full Stack E-Learning Platform",
      "description": "End-to-end LMS with course management, student tracking, and secure REST APIs.",
      "longDescription": "A full-featured learning management system built with Angular and Spring Boot. Implements JWT-based auth, JPA/Hibernate ORM, and a responsive UI for course browsing, enrollment, and progress tracking.",
      "technologies": ["Spring Boot", "Angular", "MySQL", "JPA/Hibernate", "REST APIs", "Spring Security"],
      "categories": ["Frontend", "Backend"],
      "role": "Full Stack Developer",
      "featured": true,
      "order": 1
    },
    {
      "id": 2,
      "title": "GenAI Multi-Agent Code Generator",
      "subtitle": "AI-Powered Application Code Generator",
      "description": "Multi-agent LLM system that generates production-ready application code from natural language specs.",
      "longDescription": "Leverages Microsoft Autogen to orchestrate specialized LLM agents for requirements analysis, code generation, review, and documentation — producing structured, runnable codebases from plain-English inputs.",
      "technologies": ["Python", "Autogen", "Generative AI", "LLM Agents"],
      "categories": ["AI"],
      "role": "AI Developer",
      "featured": true,
      "order": 2
    },
    {
      "id": 3,
      "title": "InterviewLens",
      "subtitle": "GenAI Campus Interview Platform",
      "description": "AI-driven interview simulation platform with real-time question generation and evaluation.",
      "longDescription": "Backend-heavy platform using Python, PostgreSQL, and Autogen agents to simulate technical interviews, evaluate responses, and generate detailed feedback reports. Containerized with Podman.",
      "technologies": ["Python", "PostgreSQL", "Autogen", "Podman"],
      "categories": ["AI", "Backend"],
      "role": "Backend Developer",
      "featured": false,
      "order": 3
    },
    {
      "id": 4,
      "title": "Databricks ETL Pipeline",
      "subtitle": "Scalable Data Processing Pipeline",
      "description": "Medallion-architecture ETL pipeline on Databricks for large-scale data transformation and analytics.",
      "longDescription": "Implements Bronze → Silver → Gold medallion layers using PySpark on Databricks. Handles schema evolution, data quality checks, incremental loads, and delivers analytics-ready datasets for BI consumption.",
      "technologies": ["Databricks", "PySpark", "Medallion Architecture", "SQL"],
      "categories": ["Data Engineering"],
      "role": "Data Engineer",
      "featured": false,
      "order": 4
    }
  ],
  "skills": [
    {
      "id": 1,
      "category": "Frontend",
      "icon": "code",
      "skills": [
        { "name": "Angular", "level": 90 },
        { "name": "TypeScript", "level": 85 },
        { "name": "HTML/CSS", "level": 90 },
        { "name": "TailwindCSS", "level": 80 }
      ]
    },
    {
      "id": 2,
      "category": "Backend",
      "icon": "server",
      "skills": [
        { "name": "Spring Boot", "level": 85 },
        { "name": "Java", "level": 85 },
        { "name": "REST APIs", "level": 90 },
        { "name": "JPA/Hibernate", "level": 80 },
        { "name": "Spring Security", "level": 75 }
      ]
    },
    {
      "id": 3,
      "category": "AI/ML",
      "icon": "cpu",
      "skills": [
        { "name": "Python", "level": 80 },
        { "name": "Generative AI", "level": 75 },
        { "name": "Autogen", "level": 75 },
        { "name": "LLM Agents", "level": 70 }
      ]
    },
    {
      "id": 4,
      "category": "Data Engineering",
      "icon": "database",
      "skills": [
        { "name": "PostgreSQL", "level": 80 },
        { "name": "MySQL", "level": 85 },
        { "name": "Databricks", "level": 70 },
        { "name": "PySpark", "level": 65 },
        { "name": "ETL Pipelines", "level": 70 }
      ]
    },
    {
      "id": 5,
      "category": "Tools & DevOps",
      "icon": "tool",
      "skills": [
        { "name": "Git", "level": 85 },
        { "name": "Docker/Podman", "level": 70 },
        { "name": "VS Code", "level": 90 },
        { "name": "IntelliJ", "level": 80 },
        { "name": "Postman", "level": 85 },
        { "name": "Maven", "level": 75 }
      ]
    }
  ],
  "experience": [
    {
      "id": 1,
      "period": "Nov 2025 – Present",
      "type": "Full-time",
      "title": "Software Development Engineer",
      "company": "HashedIn by Deloitte",
      "location": "Bengaluru, India",
      "current": true,
      "highlights": [
        "Building enterprise-grade frontend applications using Angular with Signals-based state management",
        "Developing responsive, accessible UI component libraries consumed across multiple product teams",
        "Collaborating with cross-functional teams on REST API design and Spring Boot microservices",
        "Contributing to GenAI-powered platforms and multi-agent AI systems using Autogen"
      ]
    },
    {
      "id": 2,
      "period": "Jul 2025 – Sep 2025",
      "type": "Internship",
      "title": "Software Development Intern",
      "company": "HashedIn by Deloitte",
      "location": "Bengaluru, India",
      "current": false,
      "highlights": [
        "Completed 3-month intensive full-stack development program",
        "Built end-to-end projects spanning Angular, Spring Boot, PostgreSQL, and Docker",
        "Gained hands-on enterprise development experience including CI/CD, code reviews, and Agile sprints",
        "Delivered LearnSphere LMS as a capstone project"
      ]
    }
  ],
  "messages": []
}
```

> `messages` is a writable collection — the Contact form will POST to it via `json-server`.

---

## Part 2 — Data Layer: `PortfolioService`

### 2.1 Create `src/app/core/services/portfolio.service.ts`

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

const BASE = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private http = inject(HttpClient);

  getMeta()       { return this.http.get<any>(`${BASE}/meta`).pipe(shareReplay(1)); }
  getAbout()      { return this.http.get<any>(`${BASE}/about`).pipe(shareReplay(1)); }
  getProjects()   { return this.http.get<any[]>(`${BASE}/projects`).pipe(shareReplay(1)); }
  getSkills()     { return this.http.get<any[]>(`${BASE}/skills`).pipe(shareReplay(1)); }
  getExperience() { return this.http.get<any[]>(`${BASE}/experience`).pipe(shareReplay(1)); }

  sendMessage(payload: { name: string; email: string; message: string }) {
    return this.http.post(`${BASE}/messages`, {
      ...payload,
      sentAt: new Date().toISOString(),
      read: false
    });
  }
}
```

Add `provideHttpClient()` to `app.config.ts`.

### 2.2 Refactor every component

Replace all inline hardcoded arrays with calls to `PortfolioService`. Use `toSignal()` from `@angular/core/rxjs-interop` to bridge the Observables into Signals, keeping the existing reactive template patterns intact.

```typescript
// Pattern to follow in each component
protected data = toSignal(this.portfolioService.getXxx(), { initialValue: null });
```

Show a skeleton loading state while data is null/undefined (see Part 3.3 below).

---

## Part 3 — Visual & Interaction Enhancements

### 3.1 Home Page — Hero Section

**Current:** Static text, basic typing effect, 3 buttons.

**Enhance to:**
- **Particle canvas background:** Render ~80 floating dots on an HTML `<canvas>` element behind the hero content. Dots drift slowly; on mouse move, the nearest dots within 120px radius repel away from the cursor smoothly (spring physics). Use `requestAnimationFrame`. Canvas must respect dark/light theme color variables.
- **Glassmorphism hero card:** Wrap the hero content in a `backdrop-filter: blur(20px)` glass card with a subtle `1px solid rgba(139,92,246,0.25)` border and very soft inset shadow.
- **Animated gradient border:** The glass card should have an animated conic-gradient border that rotates infinitely (CSS `@property` + `@keyframes` for `--angle`).
- **Typing cursor refinement:** After the last character of each role, pause 2 seconds before deleting. Show a blinking `|` cursor that disappears during the delete phase.
- **CTA buttons:** On hover, `btn-primary` should show a shimmer/sweep effect (a white diagonal streak passing left-to-right using `::after` pseudo-element). `btn-outline` should fill with the gradient on hover instead of just changing border.
- **Stats row:** Each stat counter animates from `0` to its target number over 1.5s when it enters the viewport (IntersectionObserver + `requestAnimationFrame` ticker). Numbers use monospace font.

### 3.2 Navbar

**Current:** Fixed navbar, scroll detection, theme toggle, mobile hamburger.

**Enhance to:**
- **Progress bar:** A 2px purple-to-cyan gradient line at the very top of the viewport that fills from 0% to 100% as the user scrolls down the page. Use `window.scrollY / (document.body.scrollHeight - window.innerHeight)`.
- **Active section indicator:** Instead of router-based active link, detect which section is currently in the viewport using `IntersectionObserver` and highlight the corresponding nav link dynamically — even on the home page where all sections may be one scroll.
- **Mobile menu:** Replace the slide-in with a full-screen overlay that fades in with a staggered animation for each nav link (links fly in from bottom with 80ms stagger). Add a blurred backdrop behind it.
- **Logo animation:** On hover, the `<SN/>` logo brackets animate outward (spread apart) using CSS transform and spring back on mouse-leave.

### 3.3 Loading Skeletons

For every section that loads from the API, show animated skeleton placeholders while data is loading:
- Skeleton cards: `background: linear-gradient(90deg, var(--color-bg-card) 25%, var(--color-bg-card-hover) 50%, var(--color-bg-card) 75%)` with `background-size: 200% 100%` animating `background-position` from `200% 0` to `-200% 0` over 1.5s (shimmer effect).
- Projects: 4 skeleton cards in the grid.
- Skills: 5 skeleton category blocks.
- Experience: 2 skeleton timeline entries.

### 3.4 Projects Page

**Current:** Filter buttons + card grid.

**Enhance to:**
- **Filter pills with animated indicator:** The active filter pill has a sliding background pill underneath it (absolutely positioned) that `transform: translateX()` moves smoothly to the active button's position when filters change. No opacity fade — the background slides.
- **Card enter/leave animation:** When filter changes, exiting cards animate `opacity: 0, scale(0.9)` (150ms), then entering cards animate `opacity: 1, scale(1)` (200ms) with stagger. Use Angular Animations `query + stagger`.
- **Project detail modal:** Clicking anywhere on a project card opens a centered modal overlay (not a new route). The modal:
  - Slides up from bottom on mobile, scales in from center on desktop.
  - Shows title, subtitle, long description, full tech tag list, role badge, and categories.
  - Has a close button (X) and closes on Escape key or backdrop click.
  - Background is blurred (`backdrop-filter: blur(8px)`) with a dark overlay.
  - Trap focus inside while open (a11y).
- **Tech tags:** Each tag in the card has a unique color based on its category (e.g., Frontend = purple, Backend = blue, AI = green, Data = orange, DevOps = red). Store the color map in a utility constant.
- **Featured badge:** Projects with `"featured": true` show a small `★ Featured` badge in the top-right corner of the card with a gold gradient.

### 3.5 Skills Page

**Current:** Category grid with flat progress bars.

**Enhance to:**
- **Animated progress bars:** When a skill category card enters the viewport (IntersectionObserver), each bar animates its `width` from `0%` to its target percentage over 800ms with staggered 80ms delay per bar. Use CSS transitions triggered by adding a `.visible` class, not Angular Animations, for performance.
- **Radial skill summary:** At the top of the skills section, add a row of large circular progress rings (SVG `<circle>` with `stroke-dasharray` / `stroke-dashoffset`). Show one ring per category, animated the same way as bars — on entry, `stroke-dashoffset` goes from full circumference to the percentage value. Each ring has a label underneath. This gives a high-level overview before the detailed cards.
- **Tooltip on hover:** Hovering a skill bar shows a floating tooltip with the percentage value and a short descriptor (e.g., "Proficient", "Advanced", "Expert") based on the level range: <60 Familiar, 60–74 Proficient, 75–84 Advanced, 85–100 Expert.
- **Category icon:** Each category card header shows a relevant SVG icon (inline, not an icon library). Use: code brackets for Frontend, server stack for Backend, brain for AI/ML, cylinder for Data, wrench for Tools.

### 3.6 Experience Page

**Current:** Alternating timeline.

**Enhance to:**
- **Animated timeline line:** The vertical connecting line draws itself from top to bottom as the user scrolls into the section, using CSS `clip-path` or `scaleY` transform driven by IntersectionObserver.
- **Timeline dot pulse:** The dot for the current (active) experience entry permanently pulses with a ripple animation (expanding ring, same as the availability badge on Home). Past entries have a static filled dot.
- **Highlight chips:** Each bullet in `highlights` renders as a pill/chip with a subtle left-border accent rather than a plain list item. On hover, the chip background transitions to `var(--color-primary)` at 10% opacity.
- **Company logo placeholder:** Add a `logoPlaceholder` color field to each experience entry in `db.json`. Render it as a colored square avatar with the company initials in the card header (e.g., "HD" for HashedIn by Deloitte).

### 3.7 Contact Page

**Current:** Reactive form + contact info.

**Enhance to:**
- **Form field floating labels:** Replace static labels above inputs with floating labels that animate up and shrink when the field is focused or has a value (CSS-only using `:placeholder-shown` + `:focus` selectors).
- **Character counter:** The message textarea shows a live character count (`x / 500`) in the bottom-right corner of the field, turning red when over 450.
- **Submit state machine:** The submit button has four visual states:
  1. **Default:** "Send Message" with a send icon.
  2. **Loading:** Spinner replaces icon, text changes to "Sending…", button disabled.
  3. **Success:** Green checkmark animates in (draw-on SVG stroke animation), text "Sent!", button disabled for 3s.
  4. **Error:** Red X icon, text "Failed — Try Again", button re-enabled.
  The form POSTs to `json-server` (`POST /messages`). Show state 2 for at least 600ms for UX polish even if the call is instant.
- **Map / Location card:** Below the contact info, add a static card that shows "Bengaluru, India" with a simple SVG pin icon and a subtle animated gradient background (purple → cyan diagonal shimmer, 3s cycle). No external map embed needed.
- **Social link hover:** Each social link (GitHub, LinkedIn, Email) animates with a left-to-right underline on hover (CSS `::after` width transition from 0% to 100%).

### 3.8 About Page

**Current:** Two-column layout with timeline and tech stack pills.

**Enhance to:**
- **Tech stack category filter:** Add small pill buttons above the tech stack grid for each category (Frontend, Backend, Language, etc.). Clicking a category fades out non-matching pills and highlights matching ones. Default shows all.
- **Pill entrance animation:** Tech pills stagger-animate in on page load (use `staggerFadeIn` from existing `fade.animation.ts`).
- **Timeline connector animation:** The vertical line connecting timeline entries draws itself downward on scroll-reveal, same technique as Experience.
- **Profile photo placeholder:** Add a circular avatar placeholder in the left column (if no real photo is provided). Use a CSS gradient circle with initials "SN" in large text, with a rotating gradient border (same conic-gradient trick as the Hero card).

### 3.9 Footer

**Current:** Static footer.

**Enhance to:**
- **"Back to top" button:** A small circular button with an up-arrow icon that appears fixed at the bottom-right of the viewport once the user scrolls past 400px. Smooth-scrolls to the top on click. Animate in/out with `opacity` + `translateY`.
- **Visitor counter (fake):** Show a small "👁 Visited by 1,200+ developers" label in the footer. The number is stored in `db.json` under `meta.visitorCount`. On load, fetch it and animate the count up from 0.

---

## Part 4 — Global Polish

### 4.1 View Transitions (already enabled)
Use Angular's built-in `withViewTransitions()` (already in `app.config.ts`). Add CSS `::view-transition-old` and `::view-transition-new` rules in `styles.css` to slide pages left/right on navigation:
```css
::view-transition-old(root) { animation: slide-out-left 200ms ease-in; }
::view-transition-new(root) { animation: slide-in-right 200ms ease-out; }
```

### 4.2 Cursor glow (desktop only)
Add a `300px × 300px` radial gradient div that follows the mouse cursor with a small lag (lerp: `x += (target - x) * 0.08`). Set it to `pointer-events: none; position: fixed; z-index: 0; mix-blend-mode: screen; opacity: 0.06`. This gives a subtle ambient light effect. Only render on `hover: hover` media query (skip touch devices).

### 4.3 Reduced motion
Wrap ALL animations and transitions in:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
And disable the canvas particle system and cursor glow when `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.

### 4.4 Error boundary
Add a global HTTP error interceptor (`HttpInterceptorFn`) that catches `json-server` failures and shows a dismissible toast notification at the top of the screen:
- "Could not connect to data server. Showing cached content." (if the API is unreachable)
- Styled as a yellow/amber warning bar at the top of the page, with a close button.
- Falls back gracefully — components show empty states instead of breaking.

### 4.5 `aria-live` regions
All dynamic content changes (filter results, form success/error, modal open/close) must update an `aria-live="polite"` region so screen readers announce the changes.

---

## Part 5 — Code Quality Rules

1. **No new third-party UI libraries.** Implement every UI effect with vanilla CSS, SVG, and Angular primitives.
2. **No jQuery, GSAP, or animation libraries.** Use `requestAnimationFrame`, CSS keyframes, and Angular Animations only.
3. **Keep components lean.** If a component file exceeds ~200 lines, extract logic into a dedicated service or helper.
4. **Angular Signals everywhere.** Use `signal()`, `computed()`, and `toSignal()`. Do not introduce `BehaviorSubject` or `Subject` for new state.
5. **Strict TypeScript.** Define interfaces for every `db.json` entity in `src/app/core/models/`. Example: `project.model.ts`, `skill.model.ts`, `experience.model.ts`, `meta.model.ts`.
6. **One component per file.** Do not co-locate multiple components in one file.
7. **CSS isolation.** Keep component-specific styles in the component's `.css` file. Only add to `styles.css` for truly global rules.
8. **Bundle budget.** Keep the production initial bundle under 500kB. Do not add heavy dependencies.

---

## Deliverables Checklist

- [ ] `db.json` at project root with all data
- [ ] `json-server` installed and `package.json` scripts updated
- [ ] `PortfolioService` with typed HTTP calls for all endpoints
- [ ] `provideHttpClient()` registered in `app.config.ts`
- [ ] TypeScript model interfaces in `src/app/core/models/`
- [ ] All 6 components refactored to load from API via `toSignal()`
- [ ] Skeleton loading states for Projects, Skills, Experience
- [ ] Home: particle canvas, animated stats counter, shimmer CTA, glassmorphism card
- [ ] Navbar: scroll progress bar, active section tracking, full-screen mobile menu
- [ ] Projects: sliding filter indicator, card animations, detail modal with a11y focus trap
- [ ] Skills: SVG radial rings, animated bars on scroll, percentage tooltips
- [ ] Experience: self-drawing timeline line, pulsing active dot, highlight chips
- [ ] Contact: floating labels, character counter, 4-state submit button, POST to json-server
- [ ] About: tech category filter, animated timeline, profile avatar placeholder
- [ ] Footer: back-to-top button, visitor counter animation
- [ ] Cursor glow effect (desktop, `pointer-events: none`)
- [ ] View transition slide animations in `styles.css`
- [ ] HTTP error interceptor with toast fallback
- [ ] `prefers-reduced-motion` respected globally
- [ ] `aria-live` regions on all dynamic content

---

## Notes for the AI / Developer

- The app runs on `ng serve` at `localhost:4200` and json-server at `localhost:3000`.
- Run `npm run dev` (with `concurrently`) to start both simultaneously.
- The `db.json` `messages` array is append-only from the contact form. Do not add any UI to display messages — that is intentional (admin-only, out of scope).
- The purple (`#8b5cf6`) and cyan (`#06b6d4`) palette is the brand. Do not introduce new accent colors.
- Dark mode is the default. Every new visual must look great in dark mode first, then verify in light mode.
- All new CSS should use the existing CSS Variables (`--color-primary`, `--color-bg-card`, etc.) — do not hardcode hex values in component CSS files.
- The existing `ScrollRevealDirective` is already wired up. Re-use it on new sections rather than rolling a new IntersectionObserver from scratch unless the behavior differs.
