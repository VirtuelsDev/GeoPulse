import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { AssistantPanel } from '../assistant-panel/assistant-panel';

@Component({
  selector: 'app-shell',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterOutlet, Header, Sidebar, AssistantPanel],
  template: `
    <div class="shell-container">
      <app-header (toggleSidebar)="isSidebarOpen.set(!isSidebarOpen())"></app-header>

      <div class="shell-body">
        @if (isSidebarOpen()) {
          <app-sidebar class="sidebar-area"></app-sidebar>
        }

        <main class="main-content">
          <router-outlet></router-outlet>
        </main>

        <app-assistant-panel class="assistant-area"></app-assistant-panel>
      </div>
    </div>
  `,
  styles: [`
    .shell-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 100vw;
      overflow: hidden;
    }
    .shell-body {
      display: flex;
      flex: 1;
      overflow: hidden;
    }
    .main-content {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      background: #f4f7f6;
    }
    .sidebar-area {
      width: 260px;
      border-right: 1px solid #e0e0e0;
      background: #fff;
    }
    .assistant-area {
      width: 350px;
      border-left: 1px solid #e0e0e0;
      background: #fff;
    }
  `]
})
export class Shell {
  isSidebarOpen = signal(true);
}
