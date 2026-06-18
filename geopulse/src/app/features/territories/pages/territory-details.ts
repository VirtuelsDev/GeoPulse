import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TerritoryStore, Territory } from '../../../core/state/territory.store';
import { MapComponent } from '../../maps/map.component';

@Component({
  selector: 'app-territory-details',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, RouterLink, MapComponent],
  template: `
    <div class="page-container" *ngIf="territory() as t">
      <header class="page-header">
        <div class="title-row">
          <button mat-icon-button routerLink="/territories">
            <mat-icon>arrow_back</mat-icon>
          </button>
          <h1>{{ t.name }}</h1>
          <span class="badge active" *ngIf="t.isActive">Actif</span>
        </div>
        <div class="actions">
          <button mat-stroked-button color="primary" [routerLink]="['/territories/edit', t.id]">
            <mat-icon>edit</mat-icon> Modifier
          </button>
        </div>
      </header>

      <div class="details-grid">
        <mat-card class="info-card glass">
          <mat-card-header>
            <mat-card-title>Informations Générales</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="info-item">
              <span class="label">Code:</span>
              <span class="value">{{ t.code }}</span>
            </div>
            <div class="info-item">
              <span class="label">Type:</span>
              <span class="value">{{ t.type }}</span>
            </div>
            <div class="info-item">
              <span class="label">Pays:</span>
              <span class="value">{{ t.country }}</span>
            </div>
            <div class="info-item">
              <span class="label">Population:</span>
              <span class="value">{{ t.population | number }} hab.</span>
            </div>
            <div class="info-item">
              <span class="label">Superficie:</span>
              <span class="value">{{ t.areaKm2 }} km²</span>
            </div>
          </mat-card-content>
        </mat-card>

        <div class="map-card glass">
          <app-map></app-map>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 24px; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .title-row { display: flex; align-items: center; gap: 16px; }
    .details-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 24px; }
    .info-card { padding: 16px; }
    .info-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee; }
    .label { color: #666; font-weight: 500; }
    .value { font-weight: bold; }
    .map-card { height: 500px; border-radius: 12px; overflow: hidden; }
    .badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; background: #E3F2FD; color: #1976D2; }
    .glass { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); }
  `]
})
export class TerritoryDetailsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(TerritoryStore);
  territory = signal<Territory | null>(null);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const t = this.store.territories().find(x => x.id === id);
    if (t) {
      this.territory.set(t);
    }
  }
}
