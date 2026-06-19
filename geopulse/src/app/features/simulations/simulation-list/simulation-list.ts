import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulationStore } from '../state/simulation.store';

@Component({
  selector: 'app-simulation-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="simulations-page">
      <h1>Simulations Urbaines</h1>
      <p>Liste des scénarios de simulation en cours ou terminés.</p>
    </div>
  `
})
export class SimulationList implements OnInit {
  protected store = inject(SimulationStore);
  ngOnInit() { this.store.loadSimulations(); }
}
