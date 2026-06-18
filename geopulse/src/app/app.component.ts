import { Component, ChangeDetectionStrategy, signal, inject, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AssistantComponent } from './features/assistant/assistant.component';
import { TerritorySelector } from './features/territories/components/territory-selector';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatBadgeModule,
    MatInputModule,
    MatFormFieldModule,
    AssistantComponent,
    TerritorySelector
  ],
  template: `
    <div class="app-shell" [class.dark-theme]="isDarkTheme()">
      <mat-sidenav-container class="sidenav-container">
        <!-- Sidebar -->
        <mat-sidenav #sidenav mode="side" opened [class.collapsed]="isCollapsed()">
          <div class="logo-container">
            <mat-icon color="primary">hub</mat-icon>
            @if (!isCollapsed()) {
              <span>GeoPulse-AI</span>
            }
          </div>

          <mat-nav-list>
            <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
              <mat-icon matListItemIcon>dashboard</mat-icon>
              @if (!isCollapsed()) {
                <span>Tableau de bord</span>
              }
            </a>
            <a mat-list-item routerLink="/maps">
              <mat-icon matListItemIcon>map</mat-icon>
              @if (!isCollapsed()) {
                <span>Cartes</span>
              }
            </a>
            <a mat-list-item>
              <mat-icon matListItemIcon>analytics</mat-icon>
              @if (!isCollapsed()) {
                <span>Analyses</span>
              }
            </a>
            <a mat-list-item>
              <mat-icon matListItemIcon>simulation</mat-icon>
              @if (!isCollapsed()) {
                <span>Simulations</span>
              }
            </a>
            <a mat-list-item>
              <mat-icon matListItemIcon>layers</mat-icon>
              @if (!isCollapsed()) {
                <span>Territoires</span>
              }
            </a>
            <mat-divider></mat-divider>
            <a mat-list-item>
              <mat-icon matListItemIcon [matBadge]="3" matBadgeColor="warn" matBadgeSize="small">notifications</mat-icon>
              @if (!isCollapsed()) {
                <span>Alertes</span>
              }
            </a>
          </mat-nav-list>

          <div class="sidebar-footer">
            <button mat-icon-button (click)="toggleCollapse()">
              <mat-icon>{{ isCollapsed() ? 'chevron_right' : 'chevron_left' }}</mat-icon>
            </button>
          </div>
        </mat-sidenav>

        <mat-sidenav-content>
          <!-- Topbar -->
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

            <button mat-icon-button (click)="toggleTheme()">
              <mat-icon>{{ isDarkTheme() ? 'light_mode' : 'dark_mode' }}</mat-icon>
            </button>

            <button mat-icon-button (click)="toggleAssistant()">
              <mat-icon color="primary">assistant</mat-icon>
            </button>

            <div class="user-profile">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre" alt="User Avatar">
              <span class="user-name">Pierre</span>
            </div>
          </mat-toolbar>

          <!-- Main Content -->
          <main class="main-content">
            <router-outlet></router-outlet>
          </main>
        </mat-sidenav-content>

        <!-- Assistant Drawer -->
        <mat-sidenav #assistantDrawer mode="over" position="end" [opened]="assistantVisible()">
          <app-assistant (close)="toggleAssistant()"></app-assistant>
        </mat-sidenav>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .app-shell {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .sidenav-container {
      flex: 1;
    }
    mat-sidenav {
      width: 260px;
      border-right: none;
      background: #f8f9fa;
      display: flex;
      flex-direction: column;
      transition: width 0.3s;
    }
    mat-sidenav.collapsed {
      width: 80px;
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
    .main-content {
      height: calc(100vh - 64px);
      overflow-y: auto;
      background: #f4f7fe;
    }
    #assistantDrawer {
      width: 400px;
    }
    .new-btn {
      border-radius: 20px;
    }
  `]
})
export class AppComponent {
  isCollapsed = signal(false);
  isDarkTheme = signal(false);
  assistantVisible = signal(false);

  toggleCollapse() {
    this.isCollapsed.set(!this.isCollapsed());
  }

  toggleTheme() {
    this.isDarkTheme.set(!this.isDarkTheme());
  }

  toggleAssistant() {
    this.assistantVisible.set(!this.assistantVisible());
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      // Logic for focus on search or open global search
    }
    if ((event.ctrlKey || event.metaKey) && event.key === '/') {
      event.preventDefault();
      this.toggleAssistant();
    }
  }
}
