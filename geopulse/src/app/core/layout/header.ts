import { Component, ChangeDetectionStrategy, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatDividerModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  theme = inject(ThemeService);

  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() toggleAssistant = new EventEmitter<void>();

  periods = ['Aujourd\'hui', '7 derniers jours', '30 derniers jours', 'Année en cours'];
  selectedPeriod = '30 derniers jours';
}
