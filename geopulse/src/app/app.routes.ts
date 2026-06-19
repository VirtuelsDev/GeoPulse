import { Routes } from '@angular/router';
import { Shell } from './core/layout/shell/shell';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/pages/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'territories',
        loadComponent: () => import('./features/territories/pages/territory-list/territory-list').then(m => m.TerritoryList)
      },
      {
        path: 'territories/:id',
        loadComponent: () => import('./features/territories/pages/territory-details/territory-details').then(m => m.TerritoryDetails)
      },
      {
        path: 'simulations',
        loadComponent: () => import('./features/simulations/pages/simulation-list/simulation-list').then(m => m.SimulationList)
      },
      {
        path: 'maps',
        loadComponent: () => import('./features/maps/pages/map-view/map-view').then(m => m.MapView)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
