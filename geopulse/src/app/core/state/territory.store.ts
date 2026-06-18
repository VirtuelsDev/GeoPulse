import { Injectable, signal, computed } from '@angular/core';

export interface Territory {
  id: number;
  code: string;
  name: string;
  type: string;
  country: string;
  region: string;
  population: number;
  areaKm2: number;
  latitude: number;
  longitude: number;
  geometry: any;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class TerritoryStore {
  private _territories = signal<Territory[]>([]);
  private _activeTerritoryId = signal<number | null>(null);

  territories = this._territories.asReadonly();
  activeTerritoryId = this._activeTerritoryId.asReadonly();

  activeTerritory = computed(() =>
    this._territories().find(t => t.id === this._activeTerritoryId()) || null
  );

  setTerritories(territories: any[]) {
    this._territories.set(territories as Territory[]);
    if (territories.length > 0 && !this._activeTerritoryId()) {
      this._activeTerritoryId.set(territories[0].id);
    }
  }

  setActiveTerritory(id: number) {
    this._activeTerritoryId.set(id);
  }
}
