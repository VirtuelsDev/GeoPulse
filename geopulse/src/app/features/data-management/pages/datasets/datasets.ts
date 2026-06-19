import { Component, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-datasets',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<h1>Gestion des jeux de données</h1>'
})
export class Datasets {}
