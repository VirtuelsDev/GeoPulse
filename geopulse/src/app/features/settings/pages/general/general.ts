import { Component, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-general-settings',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<h1>Paramètres généraux</h1>'
})
export class GeneralSettings {}
