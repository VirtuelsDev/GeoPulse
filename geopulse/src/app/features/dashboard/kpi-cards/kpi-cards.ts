import { Component, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-kpi-cards',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './kpi-cards.html',
  styleUrls: ['./kpi-cards.scss']
})
export class KpiCards {}
