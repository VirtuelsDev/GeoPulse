import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerritoryStore } from '../../../core/state/territory.store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-territory-selector',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatIconModule],
  template: `
    <div class="territory-selector">
      <mat-form-field appearance="outline" subscriptSizing="dynamic">
        <mat-icon matPrefix color="primary">place</mat-icon>
        <mat-select [value]="store.activeTerritoryId()" (selectionChange)="onSelect(\$event.value)">
          @for (t of store.territories(); track t.id) {
            <mat-option [value]="t.id">{{ t.name }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
    </div>
  `,
  styles: [`
    .territory-selector {
      width: 200px;
      margin-left: 16px;
    }
    :host ::ng-deep .mat-mdc-form-field-flex {
      height: 40px;
      align-items: center;
    }
  `]
})
export class TerritorySelector {
  store = inject(TerritoryStore);

  onSelect(id: number) {
    this.store.setActiveTerritory(id);
  }
}
