import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TerritoryStore } from '../../../../core/state/territory.store';

@Component({
  selector: 'app-territory-details',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div *ngIf="store.selectedTerritory() as t">
       <h1>{{ t.name }}</h1>
       <p>Type: {{ t.type }}</p>
       <p>Population: {{ t.population | number }}</p>
    </div>
  `
})
export class TerritoryDetails implements OnInit {
  private route = inject(ActivatedRoute);
  protected store = inject(TerritoryStore);

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) this.store.loadById(+id);
  }
}
