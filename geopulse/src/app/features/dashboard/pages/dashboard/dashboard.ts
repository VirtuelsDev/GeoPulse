import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MapComponent } from '../../../maps/pages/map-view/map-view';
import { GrowthChartComponent } from '../../components/growth-chart.component';
import { AppStore } from '../../../../core/services/app.store';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MapComponent,
    GrowthChartComponent
  ],
  templateUrl: '../../dashboard.html',
  styles: [`
    .dashboard-container { padding: 24px; }
    .kpi-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 24px; margin-bottom: 24px; }
    .map-row { height: 500px; margin-bottom: 24px; }
    .chart-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  `]
})
export class DashboardPage implements OnInit {
  protected store = inject(AppStore);
  protected dashboardService = inject(DashboardService);

  ngOnInit() {
    this.store.loadTerritories();
  }
}
