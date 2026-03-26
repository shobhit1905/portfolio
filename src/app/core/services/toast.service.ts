import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly message = signal<string | null>(null);
  private timer: ReturnType<typeof setTimeout> | null = null;

  show(msg: string, duration = 6000): void {
    if (this.timer) clearTimeout(this.timer);
    this.message.set(msg);
    this.timer = setTimeout(() => this.message.set(null), duration);
  }

  clear(): void {
    if (this.timer) clearTimeout(this.timer);
    this.message.set(null);
  }
}
