import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatBadgeModule,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <div class="logo-container">
      <mat-icon color="primary">hub</mat-icon>
      @if (!collapsed()) {
        <span>GeoPulse-AI</span>
      }
    </div>

    <mat-nav-list>
      <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
        <mat-icon matListItemIcon>dashboard</mat-icon>
        @if (!collapsed()) {
          <span>Tableau de bord</span>
        }
      </a>
      <a mat-list-item routerLink="/maps" routerLinkActive="active">
        <mat-icon matListItemIcon>map</mat-icon>
        @if (!collapsed()) {
          <span>Cartes</span>
        }
      </a>
      <a mat-list-item routerLinkActive="active">
        <mat-icon matListItemIcon>analytics</mat-icon>
        @if (!collapsed()) {
          <span>Analyses</span>
        }
      </a>
      <a mat-list-item routerLinkActive="active">
        <mat-icon matListItemIcon>simulation</mat-icon>
        @if (!collapsed()) {
          <span>Simulations</span>
        }
      </a>
      <a mat-list-item routerLink="/territories" routerLinkActive="active">
        <mat-icon matListItemIcon>layers</mat-icon>
        @if (!collapsed()) {
          <span>Territoires</span>
        }
      </a>
      <mat-divider></mat-divider>
      <a mat-list-item routerLinkActive="active">
        <mat-icon matListItemIcon [matBadge]="3" matBadgeColor="warn" matBadgeSize="small">notifications</mat-icon>
        @if (!collapsed()) {
          <span>Alertes</span>
        }
      </a>
    </mat-nav-list>

    <div class="sidebar-footer">
      <button mat-icon-button (click)="toggle.emit()">
        <mat-icon>{{ collapsed() ? 'chevron_right' : 'chevron_left' }}</mat-icon>
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .logo-container {
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: bold;
      font-size: 1.2rem;
      color: #6C5CE7;
    }
    .active {
      background: rgba(108, 92, 231, 0.1);
      color: #6C5CE7 !important;
    }
    .sidebar-footer {
      margin-top: auto;
      padding: 16px;
      display: flex;
      justify-content: center;
    }
  `]
})
export class SidebarComponent {
  collapsed = input<boolean>(false);
  toggle = output<void>();
}
