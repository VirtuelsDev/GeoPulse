import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="ui-card" [class.glass]="glass()" [class.hoverable]="hoverable()">
      @if (cardTitle()) {
        <div class="card-header">
          <h3>{{ cardTitle() }}</h3>
          <ng-content select="[header-actions]"></ng-content>
        </div>
      }
      <div class="card-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .ui-card {
      background: #fff;
      border-radius: 16px;
      border: 1px solid rgba(0,0,0,0.05);
      padding: 24px;
      height: 100%;
      display: flex;
      flex-direction: column;

      &.glass {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(10px);
      }

      &.hoverable {
        transition: transform 0.2s, box-shadow 0.2s;
        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(108, 92, 231, 0.08);
        }
      }
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      h3 { margin: 0; font-size: 1.125rem; font-weight: 700; color: #2d3436; }
    }
    .card-content { flex: 1; }
  `]
})
export class UiCard {
  cardTitle = input<string>('');
  glass = input<boolean>(false);
  hoverable = input<boolean>(false);
}
