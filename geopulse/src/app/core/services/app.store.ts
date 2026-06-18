import { Injectable, signal, computed, inject } from '@angular/core';
import { Territory, Layer } from '../../shared/models/geospatial.model';
import { ApiService } from '../api/api.service';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStore {
  private api = inject(ApiService);

  // State
  private _selectedTerritory = signal<Territory | null>(null);
  private _territories = signal<Territory[]>([]);
  private _layers = signal<Layer[]>([]);
  private _loading = signal<boolean>(false);

  // Selectors
  selectedTerritory = computed(() => this._selectedTerritory());
  territories = computed(() => this._territories());
  activeLayers = computed(() => this._layers().filter(l => l.visible));
  isLoading = computed(() => this._loading());

  // Actions
  loadTerritories() {
    this._loading.set(true);
    this.api.get<Territory[]>('territories/territories/')
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (data) => this._territories.set(data),
        error: (err) => console.error('Error loading territories', err)
      });
  }

  setSelectedTerritory(territory: Territory) {
    this._selectedTerritory.set(territory);
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
