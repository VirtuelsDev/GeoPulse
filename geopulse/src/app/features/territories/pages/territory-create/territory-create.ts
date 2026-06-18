import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TerritoryStore } from '../../../../core/state/territory.store';

@Component({
  selector: 'app-territory-create',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  template: `
    <div class="page-container">
      <header class="page-header">
        <button mat-icon-button (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h1>Nouveau territoire</h1>
      </header>

      <div class="form-card glass">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="form-grid">
            <mat-form-field appearance="outline">
              <mat-label>Nom du territoire</mat-label>
              <input matInput formControlName="name" placeholder="Ex. Province du Kadiogo">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Code</mat-label>
              <input matInput formControlName="code" placeholder="Ex. KAD-01">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Type</mat-label>
              <mat-select formControlName="type">
                <mat-option value="Ville">Ville</mat-option>
                <mat-option value="Commune">Commune</mat-option>
                <mat-option value="Province">Province</mat-option>
                <mat-option value="Région">Région</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Population</mat-label>
              <input matInput type="number" formControlName="population">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Superficie (km²)</mat-label>
              <input matInput type="number" formControlName="areaKm2">
            </mat-form-field>
          </div>

          <div class="map-section">
            <h3>Délimitation géographique</h3>
            <div class="map-placeholder">
              <mat-icon size="large">map</mat-icon>
              <p>L'interface de dessin de carte Leaflet sera intégrée ici.</p>
              <button type="button" mat-stroked-button>
                <mat-icon>upload_file</mat-icon> Importer GeoJSON
              </button>
            </div>
          </div>

          <div class="form-actions">
            <button mat-button type="button" (click)="goBack()">Annuler</button>
            <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 24px; max-width: 800px; margin: 0 auto; }
    .page-header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
    .form-card { padding: 32px; border-radius: 16px; background: white; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .map-section { margin: 24px 0; padding: 24px; border: 2px dashed #ddd; border-radius: 8px; text-align: center; }
    .map-placeholder { display: flex; flex-direction: column; align-items: center; gap: 12px; color: #666; }
    .form-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; }
    .glass { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); }
  `]
})
export class TerritoryCreatePage {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private store = inject(TerritoryStore);

  form = this.fb.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
    type: ['Ville', Validators.required],
    population: [0],
    areaKm2: [0],
  });

  onSubmit() {
    if (this.form.valid) {
      const newT: any = {
        ...this.form.value,
        id: Date.now(),
        isActive: true,
        country: 'Burkina Faso',
        region: '',
        latitude: 0,
        longitude: 0,
        geometry: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.store.setTerritories([...this.store.territories(), newT]);
      this.router.navigate(['/territories']);
    }
  }

  goBack() {
    this.router.navigate(['/territories']);
  }
}
