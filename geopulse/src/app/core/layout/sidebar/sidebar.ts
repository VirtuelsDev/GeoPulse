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
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar {
  menuItems = [
    { path: '/dashboard', label: 'Tableau de bord', icon: 'dashboard' },
    { path: '/territories', label: 'Territoires', icon: 'public' },
    { path: '/simulations', label: 'Simulations', icon: 'analytics' },
    { path: '/maps', label: 'Cartographie', icon: 'map' }
  ];
}
