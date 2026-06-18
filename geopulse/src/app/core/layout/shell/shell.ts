import { Component, ChangeDetectionStrategy, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../sidebar/sidebar';
import { HeaderComponent } from '../header/header';
import { AssistantPanelComponent } from '../assistant-panel/assistant-panel';

@Component({
  selector: 'app-shell',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    SidebarComponent,
    HeaderComponent,
    AssistantPanelComponent
  ],
  template: `
    <div class="app-shell" [class.dark-theme]="isDarkTheme()">
      <mat-sidenav-container class="sidenav-container">
        <!-- Sidebar -->
        <mat-sidenav #sidenav mode="side" opened [class.collapsed]="isCollapsed()">
          <app-sidebar
            [collapsed]="isCollapsed()"
            (toggle)="toggleCollapse()">
          </app-sidebar>
        </mat-sidenav>

        <mat-sidenav-content>
          <!-- Topbar -->
          <app-header
            [isDarkTheme]="isDarkTheme()"
            (toggleTheme)="toggleTheme()"
            (toggleAssistant)="toggleAssistant()">
          </app-header>

          <!-- Main Content -->
          <main class="main-content">
            <router-outlet></router-outlet>
          </main>
        </mat-sidenav-content>

        <!-- Assistant Drawer -->
        <mat-sidenav #assistantDrawer mode="over" position="end" [opened]="assistantVisible()">
          <app-assistant-panel (close)="toggleAssistant()"></app-assistant-panel>
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
      transition: width 0.3s;
    }
    mat-sidenav.collapsed {
      width: 80px;
    }
    .main-content {
      height: calc(100vh - 64px);
      overflow-y: auto;
      background: #f4f7fe;
    }
    #assistantDrawer {
      width: 400px;
    }
  `]
})
export class ShellComponent {
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
      // Logic for focus on search
    }
    if ((event.ctrlKey || event.metaKey) && event.key === '/') {
      event.preventDefault();
      this.toggleAssistant();
    }
  }
}
