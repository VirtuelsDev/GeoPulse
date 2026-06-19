import { Component, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-user-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<h1>Liste des utilisateurs</h1>'
})
export class UserList {}
