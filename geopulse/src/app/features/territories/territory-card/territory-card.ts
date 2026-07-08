import { Component, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-territory-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './territory-card.html',
  styleUrls: ['./territory-card.scss']
})
export class TerritoryCard {}
