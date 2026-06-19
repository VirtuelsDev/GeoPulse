import { Injectable, signal, computed, inject } from '@angular/core';
import { ApiService } from '../api/api.service';
import { finalize } from 'rxjs';

export interface SimulationResult {
  id: number;
  name: string;
  parameters: any;
  kpis: any;
  recommendations?: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class SimulationStore {
  private api = inject(ApiService);

  // State
  private _simulations = signal<SimulationResult[]>([]);
  private _activeSimulation = signal<SimulationResult | null>(null);
  private _loading = signal<boolean>(false);

  // Selectors
  simulations = computed(() => this._simulations());
  activeSimulation = computed(() => this._activeSimulation());
  isLoading = computed(() => this._loading());

  // Actions
  loadSimulations() {
    this._loading.set(true);
    this.api.get<SimulationResult[]>('simulations/')
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe(data => this._simulations.set(data));
  }

  runSimulation(params: any) {
    this._loading.set(true);
    this.api.post<SimulationResult>('simulations/run/', params)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe(result => {
        this._simulations.update(sims => [result, ...sims]);
        this._activeSimulation.set(result);
      });
  }
}
