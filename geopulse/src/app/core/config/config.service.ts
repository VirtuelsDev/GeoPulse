import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  darkMode = signal<boolean>(false);

  toggleDarkMode() {
    this.darkMode.update(v => !v);
  }
}
