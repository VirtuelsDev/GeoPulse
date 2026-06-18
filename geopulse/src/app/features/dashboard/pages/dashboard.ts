import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiPageHeader } from '../../../shared/ui/ui-page-header';
import { UiKpiCard } from '../../../shared/ui/ui-kpi-card';
import { UiCard } from '../../../shared/ui/ui-card';
import { DashboardService } from '../services/dashboard.service';
import { UrbanGrowthChart } from '../components/urban-growth-chart';
import { OccupationMap } from '../components/occupation-map';
import { RecentAnalyses } from '../components/recent-analyses';
import { RecentAlerts } from '../components/recent-alerts';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    UiPageHeader,
    UiKpiCard,
    UiCard,
    UrbanGrowthChart,
    OccupationMap,
    RecentAnalyses,
    RecentAlerts,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  service = inject(DashboardService);
}
