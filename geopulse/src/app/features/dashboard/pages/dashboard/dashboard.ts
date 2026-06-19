import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Map } from '../../../maps/pages/map-view/map-view';
import { UrbanGrowthChart } from '../../components/urban-growth-chart/urban-growth-chart';
import { AppStore } from '../../../../core/services/app.store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatCardModule, Map, UrbanGrowthChart],
  template: `
    <div class="dashboard-page">
      <header class="dashboard-header">
        <h1>Tableau de bord territorial</h1>
        <p class="subtitle">Intelligence territoriale augmentée par l'IA</p>
      </header>

      <div class="metrics-grid">
        <mat-card class="metric-card glass">
          <mat-card-header>
            <mat-card-subtitle>Densité Urbaine</mat-card-subtitle>
            <mat-card-title>12.5%</mat-card-title>
          </mat-card-header>
        </mat-card>

        <mat-card class="metric-card glass">
          <mat-card-header>
            <mat-card-subtitle>Taux d'artificialisation</mat-card-subtitle>
            <mat-card-title>+2.4%</mat-card-title>
          </mat-card-header>
        </mat-card>
      </div>

      <div class="visuals-grid">
        <mat-card class="map-container glass">
          <app-map></app-map>
        </mat-card>

        <mat-card class="chart-container glass">
          <mat-card-header>
            <mat-card-title>Évolution de l'étalement urbain</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <app-urban-growth-chart></app-urban-growth-chart>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-page { display: flex; flex-direction: column; gap: 24px; }
    .dashboard-header h1 { margin: 0; font-size: 1.8rem; color: #2d3436; }
    .subtitle { margin: 0; color: #636e72; }

    .metrics-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 24px; }
    .metric-card { border-radius: 12px; }

    .visuals-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; min-height: 500px; }
    .map-container { height: 100%; min-height: 500px; }
    .glass { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); }
  `]
})
export class Dashboard implements OnInit {
  protected store = inject(AppStore);
  ngOnInit() { this.store.loadTerritories(); }
}
