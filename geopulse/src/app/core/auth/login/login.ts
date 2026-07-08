import { Component, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<h1>Connexion</h1>'
})
export class Login {}
