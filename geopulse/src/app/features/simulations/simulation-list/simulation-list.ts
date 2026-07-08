import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulationStore } from '../state/simulation.store';

@Component({
  selector: 'app-simulation-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './simulation-list.html',
  styleUrls: ['./simulation-list.scss']
})
export class SimulationList implements OnInit {
  protected store = inject(SimulationStore);
  ngOnInit() { this.store.loadSimulations(); }
}
