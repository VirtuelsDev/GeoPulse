import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../services/dashboard.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recent-alerts',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="alerts-list">
      @for (alert of service.alerts(); track alert.location) {
        <div class="alert-item">
          <div class="status-indicator" [style.background-color]="getCriticalityColor(alert.criticality)"></div>
          <div class="alert-content">
            <div class="alert-header">
              <span class="criticality" [style.color]="getCriticalityColor(alert.criticality)">{{ alert.criticality }}</span>
              <span class="date">{{ alert.date }}</span>
            </div>
            <p class="location">{{ alert.location }}</p>
          </div>
          <button mat-icon-button><mat-icon>chevron_right</mat-icon></button>
        </div>
      }
    </div>
  `,
  styles: [`
    .alerts-list { display: flex; flex-direction: column; gap: 12px; }
    .alert-item {
      display: flex; align-items: center; gap: 16px; padding: 12px;
      background: rgba(0,0,0,0.02); border-radius: 12px;
    }
    .status-indicator { width: 4px; height: 32px; border-radius: 4px; }
    .alert-content { flex: 1; }
    .alert-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
    .criticality { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
    .date { font-size: 0.7rem; color: #636e72; }
    .location { margin: 0; font-size: 0.875rem; font-weight: 600; color: #2d3436; }
  `]
})
export class RecentAlerts {
  service = inject(DashboardService);

  getCriticalityColor(level: string) {
    switch (level) {
      case 'Critique': return '#d63031';
      case 'Élevé': return '#E17055';
      case 'Moyen': return '#FDCB6E';
      default: return '#00B894';
    }
  }
}
