import { Component, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-alert-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<h1>Liste des alertes</h1>'
})
export class AlertList {}
