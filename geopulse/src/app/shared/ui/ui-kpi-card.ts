import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ui-kpi-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="kpi-card glass hoverable">
      <div class="kpi-icon" [style.background-color]="color() + '1A'" [style.color]="color()">
        <mat-icon>{{ icon() }}</mat-icon>
      </div>
      <div class="kpi-info">
        <span class="label">{{ label() }}</span>
        <div class="value-row">
          <h2 class="value">{{ value() }}</h2>
          <span class="trend" [class.up]="trend() > 0" [class.down]="trend() < 0">
             <mat-icon>{{ trend() > 0 ? 'trending_up' : 'trending_down' }}</mat-icon>
             {{ trend() > 0 ? '+' : '' }}{{ trend() }}%
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .kpi-card {
      background: #fff;
      border-radius: 16px;
      border: 1px solid rgba(0,0,0,0.05);
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      transition: all 0.2s;

      &:hover { transform: translateY(-4px); box-shadow: 0 8px 16px rgba(0,0,0,0.05); }
    }
    .kpi-icon {
      width: 48px; height: 48px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      mat-icon { font-size: 24px; width: 24px; height: 24px; }
    }
    .kpi-info { flex: 1; display: flex; flex-direction: column; }
    .label { font-size: 0.8125rem; color: #636e72; font-weight: 500; }
    .value-row { display: flex; align-items: baseline; gap: 8px; margin-top: 4px; }
    .value { margin: 0; font-size: 1.5rem; font-weight: 700; color: #2d3436; }
    .trend {
      display: flex; align-items: center; gap: 2px; font-size: 0.75rem; font-weight: 600;
      mat-icon { font-size: 14px; width: 14px; height: 14px; }
      &.up { color: #00B894; }
      &.down { color: #E17055; }
    }
    .glass { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); }
  `]
})
export class UiKpiCard {
  label = input.required<string>();
  value = input.required<string | number>();
  icon = input.required<string>();
  trend = input<number>(0);
  color = input<string>('#6C5CE7');
}
