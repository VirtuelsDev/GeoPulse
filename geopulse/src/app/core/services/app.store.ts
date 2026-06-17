import { Injectable, signal, computed } from '@angular/core';
import { Territory, Layer } from '../../shared/models/geospatial.model';

@Injectable({
  providedIn: 'root'
})
export class AppStore {
  // State
  private _selectedTerritory = signal<Territory | null>(null);
  private _layers = signal<Layer[]>([]);
  private _loading = signal<boolean>(false);

  // Selectors
  selectedTerritory = computed(() => this._selectedTerritory());
  activeLayers = computed(() => this._layers().filter(l => l.visible));
  isLoading = computed(() => this._loading());

  // Actions
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
