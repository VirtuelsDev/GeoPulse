import { Component, ChangeDetectionStrategy, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TerritoryStore } from '../../../features/territories/state/territory.store';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  @Output() toggleSidebar = new EventEmitter<void>();
  protected store = inject(TerritoryStore);
}
