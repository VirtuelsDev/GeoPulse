import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TerritoryStore } from '../state/territory.store';

@Component({
  selector: 'app-territory-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  template: `
    <div class="territory-list-page">
      <header class="page-header">
        <h1>Territoires</h1>
        <button mat-flat-button color="primary">Ajouter un territoire</button>
      </header>

      <table mat-table [dataSource]="store.territories()" class="mat-elevation-z1">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Nom</th>
          <td mat-cell *matCellDef="let t">{{t.name}}</td>
        </ng-container>
        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef>Type</th>
          <td mat-cell *matCellDef="let t">{{t.type}}</td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let t">
            <button mat-icon-button [routerLink]="['/territories', t.id]"><mat-icon>visibility</mat-icon></button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="['name', 'type', 'actions']"></tr>
        <tr mat-row *matRowDef="let row; columns: ['name', 'type', 'actions'];"></tr>
      </table>
    </div>
  `,
  styles: [`.page-header { display: flex; justify-content: space-between; margin-bottom: 24px; }`]
})
export class TerritoryList implements OnInit {
  protected store = inject(TerritoryStore);
  ngOnInit() {
     if (this.store.territories().length === 0) {
       this.store.setTerritories([{id: 1, name: 'Ouagadougou', type: 'CITY', population: 2500000, isActive: true} as any]);
     }
  }
}
