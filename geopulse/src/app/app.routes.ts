import { Routes } from '@angular/router';
import { ShellComponent } from './core/layout/shell/shell';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/pages/dashboard/dashboard').then(m => m.DashboardPage)
      },
      {
        path: 'maps',
        loadComponent: () => import('./features/maps/pages/map-view/map-view').then(m => m.MapComponent)
      },
      {
        path: 'territories',
        loadComponent: () => import('./features/territories/pages/territory-list/territory-list').then(m => m.TerritoryListPage)
      },
      {
        path: 'territories/create',
        loadComponent: () => import('./features/territories/pages/territory-create/territory-create').then(m => m.TerritoryCreatePage)
      },
      {
        path: 'territories/details/:id',
        loadComponent: () => import('./features/territories/pages/territory-details/territory-details').then(m => m.TerritoryDetailsPage)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
