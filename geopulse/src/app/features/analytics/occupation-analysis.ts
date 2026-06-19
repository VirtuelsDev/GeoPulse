import { Component, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-occupation-analysis',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<h1>Analyse de l\'occupation des sols</h1>'
})
export class OccupationAnalysis {}
