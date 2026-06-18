import { Component, ChangeDetectionStrategy, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TerritorySelector } from '../../../features/territories/components/territory-selector';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    TerritorySelector
  ],
  template: `
    <mat-toolbar color="default" class="topbar glass">
      <div class="search-container">
        <mat-icon>search</mat-icon>
        <input type="text" placeholder="Rechercher (Ctrl + K)">
      </div>

      <app-territory-selector></app-territory-selector>

      <span class="spacer"></span>

      <button mat-flat-button color="primary" class="new-btn">
        <mat-icon>add</mat-icon> Nouveau
      </button>

      <button mat-icon-button (click)="toggleTheme.emit()">
        <mat-icon>{{ isDarkTheme() ? 'light_mode' : 'dark_mode' }}</mat-icon>
      </button>

      <button mat-icon-button (click)="toggleAssistant.emit()">
        <mat-icon color="primary">assistant</mat-icon>
      </button>

      <div class="user-profile">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre" alt="User Avatar">
        <span class="user-name">Pierre</span>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .topbar {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 0 24px;
      background: rgba(255, 255, 255, 0.8) !important;
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(0,0,0,0.05);
    }
    .spacer { flex: 1; }
    .search-container {
      display: flex;
      align-items: center;
      background: #f1f3f4;
      padding: 4px 12px;
      border-radius: 8px;
      width: 300px;
      gap: 8px;
    }
    .search-container input {
      border: none;
      background: transparent;
      outline: none;
      width: 100%;
    }
    .user-profile {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-left: 16px;
    }
    .user-profile img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
    .new-btn {
      border-radius: 20px;
    }
    .glass {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(10px);
    }
  `]
})
export class HeaderComponent {
  isDarkTheme = input<boolean>(false);
  toggleTheme = output<void>();
  toggleAssistant = output<void>();
}
