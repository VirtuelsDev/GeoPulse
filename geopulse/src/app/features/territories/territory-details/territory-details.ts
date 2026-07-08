import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TerritoryStore } from '../state/territory.store';

@Component({
  selector: 'app-territory-details',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './territory-details.html',
  styleUrls: ['./territory-details.scss']
})
export class TerritoryDetails implements OnInit {
  private route = inject(ActivatedRoute);
  protected store = inject(TerritoryStore);

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) this.store.setActiveTerritory(+id);
  }
}
