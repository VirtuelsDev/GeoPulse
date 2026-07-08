import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Map } from '../../maps/map-view/map-view';
import { UrbanGrowthChart } from '../urban-growth-chart/urban-growth-chart';
import { AppStore } from '../../../core/services/app.store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatCardModule, Map, UrbanGrowthChart],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {
  protected store = inject(AppStore);
  ngOnInit() { this.store.loadTerritories(); }
}
