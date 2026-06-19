import { Component, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-scenario-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<h1>Liste des scénarios</h1>'
})
export class ScenarioList {}
