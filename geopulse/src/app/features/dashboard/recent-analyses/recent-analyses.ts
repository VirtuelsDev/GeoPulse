import { Component, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-recent-analyses',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './recent-analyses.html',
  styleUrls: ['./recent-analyses.scss']
})
export class RecentAnalyses {}
