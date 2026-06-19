import { Routes } from '@angular/router';
import { Shell } from './core/layout/shell/shell';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./core/auth/pages/login/login').then(m => m.Login)
  },
  {
    path: '',
    component: Shell,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'territories',
        loadComponent: () => import('./features/territories/territory-list/territory-list').then(m => m.TerritoryList)
      },
      {
        path: 'territories/create',
        loadComponent: () => import('./features/territories/create-territory/create-territory').then(m => m.CreateTerritory)
      },
      {
        path: 'territories/edit/:id',
        loadComponent: () => import('./features/territories/edit-territory/edit-territory').then(m => m.EditTerritory)
      },
      {
        path: 'territories/:id',
        loadComponent: () => import('./features/territories/territory-details/territory-details').then(m => m.TerritoryDetails)
      },
      {
        path: 'simulations',
        loadComponent: () => import('./features/simulations/simulation-list/simulation-list').then(m => m.SimulationList)
      },
      {
        path: 'maps',
        loadComponent: () => import('./features/maps/map-view/map-view').then(m => m.Map)
      },
      {
        path: 'analytics',
        loadComponent: () => import('./features/analytics/occupation-analysis').then(m => m.OccupationAnalysis)
      },
      {
        path: 'scenarios',
        loadComponent: () => import('./features/scenarios/scenario-list').then(m => m.ScenarioList)
      },
      {
        path: 'data-management',
        loadComponent: () => import('./features/data-management/datasets').then(m => m.Datasets)
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/reports/report-list').then(m => m.ReportList)
      },
      {
        path: 'alerts',
        loadComponent: () => import('./features/alerts/alert-list').then(m => m.AlertList)
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/general').then(m => m.GeneralSettings)
      },
      {
        path: 'assistant',
        loadComponent: () => import('./features/assistant-ai/assistant').then(m => m.AssistantAI)
      },
      {
        path: 'users',
        loadComponent: () => import('./core/users/pages/user-list/user-list').then(m => m.UserList)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
