import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer glass">
      <p>&copy; 2025 GeoPulse AI - Intelligence Territoriale</p>
    </footer>
  `,
  styles: [`
    .footer {
      padding: 1rem 2rem;
      text-align: center;
      border-top: 1px solid rgba(0,0,0,0.1);
      margin-top: auto;
    }
    .glass { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); }
  `]
})
export class Footer {}
