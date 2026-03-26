import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  inject,
  effect,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { PortfolioService } from '../../core/services/portfolio.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta } from '../../core/models/portfolio.models';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas') private canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly portfolioService = inject(PortfolioService);
  protected readonly meta = toSignal<Meta | null>(this.portfolioService.getMeta(), {
    initialValue: null,
  });

  protected displayText = '';
  protected statCounters: { current: number; target: number; suffix: string; label: string }[] = [
    { current: 0, target: 4, suffix: '+', label: 'Projects' },
    { current: 0, target: 5, suffix: '+', label: 'Technologies' },
  ];

  private roles = [
    'Software Development Engineer',
    'Full Stack Developer',
    'Angular Developer',
    'AI Enthusiast',
  ];
  private isDeleting = false;
  private loopNum = 0;
  private rolesLoaded = false;
  private particles: Particle[] = [];
  private animationId = 0;
  private mouseX = -9999;
  private mouseY = -9999;
  private resizeObserver!: ResizeObserver;
  private statsObserver!: IntersectionObserver;
  private statsAnimated = false;
  private readonly reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor() {
    this.typeEffect();
    effect(() => {
      const m = this.meta();
      if (m?.roles && !this.rolesLoaded) {
        this.roles = m.roles;
        this.rolesLoaded = true;
      }
    });
  }

  ngAfterViewInit(): void {
    if (!this.reducedMotion) {
      this.setupCanvas();
    }
    this.setupStatCounters();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    this.resizeObserver?.disconnect();
    this.statsObserver?.disconnect();
  }

  private setupCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      this.initParticles(canvas.width, canvas.height);
    };

    resize();
    this.resizeObserver = new ResizeObserver(resize);
    this.resizeObserver.observe(canvas);

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
      this.mouseX = -9999;
      this.mouseY = -9999;
    });

    this.animate(canvas, ctx);
  }

  private initParticles(w: number, h: number): void {
    this.particles = Array.from({ length: 75 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.5 + 0.8,
    }));
  }

  private animate(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    const isDark = !document.body.classList.contains('light-theme');
    const dotColor = isDark ? 'rgba(139, 92, 246, 0.45)' : 'rgba(139, 92, 246, 0.3)';
    const lineColor = isDark ? 'rgba(139, 92, 246, 0.07)' : 'rgba(139, 92, 246, 0.04)';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      const dx = p.x - this.mouseX;
      const dy = p.y - this.mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120 && dist > 0) {
        const force = ((120 - dist) / 120) * 0.5;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }

      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 2.5) {
        p.vx = (p.vx / speed) * 2.5;
        p.vy = (p.vy / speed) * 2.5;
      }
      p.vx *= 0.99;
      p.vy *= 0.99;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = dotColor;
      ctx.fill();
    }

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(this.particles[i].x, this.particles[i].y);
          ctx.lineTo(this.particles[j].x, this.particles[j].y);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = (1 - dist / 110) * 0.6;
          ctx.stroke();
        }
      }
    }

    this.animationId = requestAnimationFrame(() => this.animate(canvas, ctx));
  }

  private typeEffect(): void {
    const fullText = this.roles[this.loopNum % this.roles.length];
    if (this.isDeleting) {
      this.displayText = fullText.substring(0, this.displayText.length - 1);
    } else {
      this.displayText = fullText.substring(0, this.displayText.length + 1);
    }

    let delta = this.isDeleting ? 50 : 100;
    if (!this.isDeleting && this.displayText === fullText) {
      delta = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.displayText === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(() => this.typeEffect(), delta);
  }

  private setupStatCounters(): void {
    const statsEl = document.querySelector('.hero-stats');
    if (!statsEl) return;
    this.statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !this.statsAnimated) {
          this.statsAnimated = true;
          this.animateCounters();
          this.statsObserver.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    this.statsObserver.observe(statsEl);
  }

  private animateCounters(): void {
    this.statCounters.forEach((stat, i) => {
      const duration = 1500;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        this.statCounters[i].current = Math.round(eased * stat.target);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }
}
