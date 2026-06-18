import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../services/dashboard.service';
import { UiStatusChip } from '../../../shared/ui/ui-status-chip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recent-analyses',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, UiStatusChip, MatButtonModule, MatIconModule],
  template: `
    <table class="modern-table">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Type</th>
          <th>Date</th>
          <th>Statut</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        @for (item of service.analyses(); track item.title) {
          <tr>
            <td class="bold">{{ item.title }}</td>
            <td class="muted">{{ item.type }}</td>
            <td>{{ item.date }}</td>
            <td>
              <ui-status-chip
                [label]="item.status"
                [color]="getStatusColor(item.status)">
              </ui-status-chip>
            </td>
            <td>
              <button mat-icon-button><mat-icon>visibility</mat-icon></button>
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: [`
    .modern-table {
      width: 100%; border-collapse: collapse;
      th { text-align: left; padding: 12px; font-size: 0.75rem; color: #636e72; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid rgba(0,0,0,0.05); }
      td { padding: 16px 12px; border-bottom: 1px solid rgba(0,0,0,0.03); font-size: 0.875rem; }
      .bold { font-weight: 600; color: #2d3436; }
      .muted { color: #636e72; }
    }
  `]
})
export class RecentAnalyses {
  service = inject(DashboardService);

  getStatusColor(status: string) {
    switch (status) {
      case 'Terminé': return '#00B894';
      case 'En cours': return '#FDCB6E';
      case 'Échec': return '#E17055';
      default: return '#6C5CE7';
    }
  }
}
