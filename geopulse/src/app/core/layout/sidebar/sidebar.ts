import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatListModule, MatIconModule, RouterLink, RouterLinkActive],
  template: `
    <div class="sidebar-content">
      <mat-nav-list>
        <a mat-list-item routerLink="/dashboard" routerLinkActive="active-item">
          <mat-icon matListItemIcon>dashboard</mat-icon>
          <span matListItemTitle>Tableau de bord</span>
        </a>
        <a mat-list-item routerLink="/maps" routerLinkActive="active-item">
          <mat-icon matListItemIcon>map</mat-icon>
          <span matListItemTitle>Cartographie</span>
        </a>
        <a mat-list-item routerLink="/territories" routerLinkActive="active-item">
          <mat-icon matListItemIcon>location_city</mat-icon>
          <span matListItemTitle>Territoires</span>
        </a>
        <a mat-list-item routerLink="/simulations" routerLinkActive="active-item">
          <mat-icon matListItemIcon>science</mat-icon>
          <span matListItemTitle>Simulations</span>
        </a>
      </mat-nav-list>
    </div>
  `,
  styles: [`
    .sidebar-content { height: 100%; padding-top: 16px; }
    .active-item {
      background: rgba(108, 92, 231, 0.1);
      color: #6C5CE7;
      border-right: 4px solid #6C5CE7;
    }
  `]
})
export class Sidebar {}
