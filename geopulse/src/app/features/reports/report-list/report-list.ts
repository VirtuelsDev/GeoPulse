import { Component, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-report-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<h1>Liste des rapports</h1>'
})
export class ReportList {}
