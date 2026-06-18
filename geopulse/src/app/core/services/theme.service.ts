import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private mode = signal<ThemeMode>(this.getInitialMode());
  isDark = signal<boolean>(false);

  constructor() {
    effect(() => {
      const currentMode = this.mode();
      localStorage.setItem('geopulse-theme', currentMode);
      this.applyTheme(currentMode);
    });
  }

  setMode(mode: ThemeMode) {
    this.mode.set(mode);
  }

  getMode() {
    return this.mode();
  }

  toggle() {
    this.setMode(this.isDark() ? 'light' : 'dark');
  }

  private getInitialMode(): ThemeMode {
    return (localStorage.getItem('geopulse-theme') as ThemeMode) || 'system';
  }

  private applyTheme(mode: ThemeMode) {
    let dark = mode === 'dark';
    if (mode === 'system') {
      dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.isDark.set(dark);
    if (dark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
