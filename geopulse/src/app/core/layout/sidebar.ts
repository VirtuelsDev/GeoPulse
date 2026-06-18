import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatListModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar {
  isCollapsed = input(false);

  navItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Tableau de bord' },
    { path: '/maps', icon: 'map', label: 'Cartes' },
    { path: '/analytics', icon: 'analytics', label: 'Analyses' },
    { path: '/simulations', icon: 'simulation', label: 'Simulations' },
    { path: '/scenarios', icon: 'view_list', label: 'Scénarios' },
    { path: '/territories', icon: 'layers', label: 'Territoires' },
    { path: '/data', icon: 'storage', label: 'Données' },
    { path: '/reports', icon: 'assessment', label: 'Rapports' },
    { path: '/alerts', icon: 'notifications', label: 'Alertes', badge: 3 },
    { path: '/users', icon: 'people', label: 'Utilisateurs' },
    { path: '/settings', icon: 'settings', label: 'Paramètres' }
  ];

}
