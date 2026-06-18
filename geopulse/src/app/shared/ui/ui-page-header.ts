import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-page-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <div class="title-area">
        <h1>{{ title() }}</h1>
        @if (subtitle()) {
          <p>{{ subtitle() }}</p>
        }
      </div>
      <div class="actions">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 32px;

      h1 { margin: 0; font-size: 1.75rem; font-weight: 800; color: #2d3436; letter-spacing: -0.02em; }
      p { margin: 4px 0 0; color: #636e72; font-size: 1rem; }
    }
    .actions { display: flex; gap: 12px; }
  `]
})
export class UiPageHeader {
  title = input.required<string>();
  subtitle = input<string>('');
}
