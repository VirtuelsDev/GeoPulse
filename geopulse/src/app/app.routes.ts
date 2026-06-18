import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MapComponent } from './features/maps/map.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'maps', component: MapComponent },
  {
    path: 'territories',
    loadComponent: () => import('./features/territories/pages/territories').then(m => m.TerritoriesPage)
  },
  {
    path: 'territories/create',
    loadComponent: () => import('./features/territories/pages/territory-create').then(m => m.TerritoryCreatePage)
  },
  {
    path: 'territories/details/:id',
    loadComponent: () => import('./features/territories/pages/territory-details').then(m => m.TerritoryDetailsPage)
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
