import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-status-chip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <span class="status-chip" [style.background-color]="color() + '1A'" [style.color]="color()">
      {{ label() }}
    </span>
  `,
  styles: [`
    .status-chip {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }
  `]
})
export class UiStatusChip {
  label = input.required<string>();
  color = input<string>('#6C5CE7');
}
