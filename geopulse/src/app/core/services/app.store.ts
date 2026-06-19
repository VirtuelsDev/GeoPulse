import { Injectable, signal, computed, inject } from '@angular/core';
import { Territory, Layer } from '../../shared/models/geospatial.model';
import { ApiService } from './api.service';
import { finalize } from 'rxjs';
import { TerritoryStore } from '../../features/territories/state/territory.store';

@Injectable({
  providedIn: 'root'
})
export class AppStore {
  private api = inject(ApiService);
  private territoryStore = inject(TerritoryStore);

  // State
  private _layers = signal<Layer[]>([]);
  private _loading = signal<boolean>(false);

  // Selectors
  selectedTerritory = this.territoryStore.activeTerritory;
  territories = this.territoryStore.territories;
  activeLayers = computed(() => this._layers().filter(l => l.visible));
  isLoading = computed(() => this._loading());

  // Actions
  loadTerritories() {
    this._loading.set(true);
    this.api.get<Territory[]>('territories/territories/')
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (data) => this.territoryStore.setTerritories(data),
        error: (err) => console.error('Error loading territories', err)
      });
  }

  setSelectedTerritory(id: number) {
    this.territoryStore.setActiveTerritory(id);
  }

  setLayers(layers: Layer[]) {
    this._layers.set(layers);
  }

  setLoading(value: boolean) {
    this._loading.set(value);
  }

  toggleLayer(layerId: string) {
    this._layers.update(layers => layers.map(l =>
      l.id === layerId ? { ...l, visible: !l.visible } : l
    ));
  }
}
