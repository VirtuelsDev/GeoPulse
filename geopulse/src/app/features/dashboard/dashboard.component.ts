import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MapComponent } from '../maps/map.component';
import { GrowthChartComponent } from './components/growth-chart.component';
import { AppStore } from '../../core/services/app.store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MapComponent,
    GrowthChartComponent
  ],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <div class="title-row">
          <h1>Tableau de bord</h1>
          @if (store.isLoading()) {
            <mat-spinner diameter="24"></mat-spinner>
          }
        </div>
        <p>Vue d'ensemble du territoire</p>
      </header>

      <section class="kpi-grid">
        @for (kpi of kpis; track kpi.label) {
          <mat-card class="kpi-card glass">
            <mat-card-header>
              <mat-card-title>{{ kpi.label }}</mat-card-title>
              <mat-icon mat-card-avatar>{{ kpi.icon }}</mat-icon>
            </mat-card-header>
            <mat-card-content>
              <div class="kpi-value">{{ kpi.value }} {{ kpi.unit }}</div>
              <div class="kpi-trend" [class.up]="kpi.trend > 0" [class.down]="kpi.trend < 0">
                {{ kpi.trend > 0 ? '+' : '' }}{{ kpi.trend }}% vs mois précédent
              </div>
            </mat-card-content>
          </mat-card>
        } @empty {
           <p>Aucun indicateur disponible.</p>
        }
      </section>

      <div class="visualisation-row">
        <div class="map-container glass">
           <app-map></app-map>
        </div>
        <div class="chart-container glass">
          <h3>Évolution de la croissance urbaine</h3>
          <app-growth-chart></app-growth-chart>
        </div>
      </div>

      <section class="bottom-row">
        <div class="analyses-list glass">
          <h3>Analyses récentes</h3>
          <div class="list-items">
             <div class="analysis-item">
               <span>Impact d'un nouveau parc urbain</span>
               <span class="status-badge done">Terminé</span>
             </div>
             <div class="analysis-item">
               <span>Densification secteur Nord</span>
               <span class="status-badge done">Terminé</span>
             </div>
             <div class="analysis-item">
               <span>Accessibilité aux écoles</span>
               <span class="status-badge pending">En cours</span>
             </div>
          </div>
        </div>
        <div class="alerts-list glass">
          <h3>Alertes récentes</h3>
          <div class="alert-item high">
             <mat-icon>warning</mat-icon>
             <div class="alert-content">
               <div class="alert-title">Risque d'inondation élevé (Quartier 12)</div>
               <div class="alert-time">Il y a 2h</div>
             </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 24px;
      height: 100%;
      overflow-y: auto;
    }
    .title-row { display: flex; align-items: center; gap: 16px; }
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }
    .kpi-card {
      padding: 16px;
    }
    .kpi-value {
      font-size: 2rem;
      font-weight: bold;
      margin: 8px 0;
    }
    .kpi-trend {
      font-size: 0.875rem;
    }
    .kpi-trend.up { color: #4caf50; }
    .kpi-trend.down { color: #f44336; }

    .visualisation-row {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
      height: 400px;
    }
    .map-container, .chart-container {
      height: 100%;
      padding: 16px;
      border-radius: 12px;
    }
    .bottom-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    .glass {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
    }
    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
    }
    .status-badge.done { background: #e8f5e9; color: #2e7d32; }
    .status-badge.pending { background: #fff3e0; color: #ef6c00; }

    .alert-item {
      display: flex;
      gap: 12px;
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 8px;
    }
    .alert-item.high { background: rgba(244, 67, 54, 0.1); color: #d32f2f; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  protected store = inject(AppStore);

  kpis = [
    { label: 'Population totale', value: '2 548 721', trend: 2.5, icon: 'people' },
    { label: 'Croissance urbaine', value: '18,4', unit: 'km²', trend: 12.7, icon: 'trending_up' },
    { label: 'Nouvelles constructions', value: '352', trend: 8.6, icon: 'business' },
    { label: 'Zones à risque', value: '23', trend: -4.3, icon: 'warning' }
  ];

  ngOnInit() {
    this.store.loadTerritories();
  }
}
