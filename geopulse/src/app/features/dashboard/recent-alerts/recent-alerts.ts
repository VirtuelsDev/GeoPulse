import { Component, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-recent-alerts',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './recent-alerts.html',
  styleUrls: ['./recent-alerts.scss']
})
export class RecentAlerts {}
