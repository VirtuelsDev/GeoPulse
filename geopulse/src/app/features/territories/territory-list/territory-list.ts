import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TerritoryStore } from '../state/territory.store';

@Component({
  selector: 'app-territory-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './territory-list.html',
  styleUrls: ['./territory-list.scss']
})
export class TerritoryList implements OnInit {
  protected store = inject(TerritoryStore);
  ngOnInit() {
     if (this.store.territories().length === 0) {
       this.store.setTerritories([{id: 1, name: 'Ouagadougou', type: 'CITY', population: 2500000, isActive: true} as any]);
     }
  }
}
