import { Component, ChangeDetectionStrategy, signal, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { AssistantPanel } from './assistant-panel';

@Component({
  selector: 'app-shell',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterOutlet, MatSidenavModule, Sidebar, Header, AssistantPanel],
  template: `
    <mat-sidenav-container class="shell-container">
      <mat-sidenav mode="side" opened [class.collapsed]="isSidebarCollapsed()">
        <app-sidebar [isCollapsed]="isSidebarCollapsed()"></app-sidebar>
      </mat-sidenav>

      <mat-sidenav-content class="main-shell">
        <app-header
          (toggleSidebar)="isSidebarCollapsed.set(!isSidebarCollapsed())"
          (toggleAssistant)="assistant.toggle()">
        </app-header>

        <main class="content-area">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>

      <mat-sidenav #assistant mode="over" position="end">
        <app-assistant-panel (close)="assistant.close()"></app-assistant-panel>
      </mat-sidenav>
    </mat-sidenav-container>
  `,
  styles: [`
    .shell-container { height: 100vh; background: #F8F9FC; }
    .main-shell { display: flex; flex-direction: column; overflow: hidden; }
    .content-area { flex: 1; overflow-y: auto; position: relative; }
    mat-sidenav {
      border: none;
      background: transparent;
      width: 260px;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    mat-sidenav.collapsed { width: 80px; }
  `]
})
export class Shell {
  @ViewChild('assistant') assistant!: MatSidenav;

  isSidebarCollapsed = signal(false);

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      console.log('Search shortcut Ctrl+K triggered');
      // In a real app, this would open a global search dialog
    }

    if ((event.ctrlKey || event.metaKey) && event.key === '/') {
      event.preventDefault();
      this.assistant.toggle();
    }
  }
}
