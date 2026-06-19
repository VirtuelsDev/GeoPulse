import { Component, ChangeDetectionStrategy, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TerritoryStore } from '../../state/territory.store';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary" class="header-toolbar">
      <button mat-icon-button (click)="toggleSidebar.emit()">
        <mat-icon>menu</mat-icon>
      </button>

      <span class="logo">GeoPulse AI</span>

      <span class="spacer"></span>

      <div class="territory-context" *ngIf="store.activeTerritory(); as territory">
        <mat-icon>place</mat-icon>
        <span>{{ territory.name }}</span>
      </div>

      <button mat-icon-button>
        <mat-icon>account_circle</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: [`
    .header-toolbar {
      background: #6C5CE7;
      color: white;
      display: flex;
      gap: 16px;
    }
    .logo {
      font-weight: 700;
      letter-spacing: 1px;
      font-size: 1.2rem;
    }
    .spacer { flex: 1 1 auto; }
    .territory-context {
      display: flex;
      align-items: center;
      gap: 4px;
      background: rgba(255,255,255,0.1);
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.9rem;
    }
  `]
})
export class Header {
  @Output() toggleSidebar = new EventEmitter<void>();
  protected store = inject(TerritoryStore);
}
