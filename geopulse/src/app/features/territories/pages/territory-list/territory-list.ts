import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TerritoryStore, Territory } from '../../../../core/state/territory.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-territories-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule, MatInputModule, MatFormFieldModule, RouterLink],
  template: `
    <div class="page-container">
      <header class="page-header">
        <h1>Gestion des Territoires</h1>
        <button mat-flat-button color="primary" routerLink="create">
          <mat-icon>add</mat-icon> Nouveau territoire
        </button>
      </header>

      <div class="filters">
        <mat-form-field appearance="outline">
          <mat-label>Rechercher</mat-label>
          <input matInput (keyup)="applyFilter(\$event)" placeholder="Ex. Ouagadougou">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </div>

      <div class="table-container mat-elevation-z1 glass">
        <table mat-table [dataSource]="store.territories()">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef> Nom </th>
            <td mat-cell *matCellDef="let t"> {{t.name}} </td>
          </ng-container>

          <ng-container matColumnDef="type">
            <th mat-header-cell *matHeaderCellDef> Type </th>
            <td mat-cell *matCellDef="let t"> {{t.type}} </td>
          </ng-container>

          <ng-container matColumnDef="population">
            <th mat-header-cell *matHeaderCellDef> Population </th>
            <td mat-cell *matCellDef="let t"> {{t.population | number}} </td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef> Statut </th>
            <td mat-cell *matCellDef="let t">
              <span class="badge" [class.active]="t.isActive">
                {{ t.isActive ? 'Actif' : 'Inactif' }}
              </span>
            </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef> Actions </th>
            <td mat-cell *matCellDef="let t">
              <button mat-icon-button color="primary" [routerLink]="['details', t.id]">
                <mat-icon>visibility</mat-icon>
              </button>
              <button mat-icon-button color="accent" [routerLink]="['edit', t.id]">
                <mat-icon>edit</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 24px; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .filters { margin-bottom: 16px; }
    .table-container { border-radius: 12px; overflow: hidden; background: white; }
    .badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; background: #eee; }
    .badge.active { background: #E3F2FD; color: #1976D2; }
    .glass { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); }
  `]
})
export class TerritoryListPage implements OnInit {
  store = inject(TerritoryStore);
  displayedColumns: string[] = ['name', 'type', 'population', 'status', 'actions'];

  ngOnInit() {
    // Initial mock data if empty
    if (this.store.territories().length === 0) {
      this.store.setTerritories([
        { id: 1, name: 'Ouagadougou', type: 'Ville', population: 2500000, isActive: true, code: 'OUAGA', country: 'Burkina Faso', region: 'Centre', areaKm2: 500, latitude: 12.37, longitude: -1.52, geometry: null, createdAt: '', updatedAt: '' },
        { id: 2, name: 'Bobo-Dioulasso', type: 'Ville', population: 800000, isActive: true, code: 'BOBO', country: 'Burkina Faso', region: 'Hauts-Bassins', areaKm2: 200, latitude: 11.17, longitude: -4.3, geometry: null, createdAt: '', updatedAt: '' }
      ]);
    }
  }

  applyFilter(event: Event) {
    // Filter logic...
  }
}
