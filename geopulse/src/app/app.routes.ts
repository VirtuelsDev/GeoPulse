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
        loadComponent: () => import('./features/maps/pages/map-view/map-view').then(m => m.Map)
      },
      {
        path: 'analytics',
        loadComponent: () => import('./features/analytics/pages/occupation-analysis/occupation-analysis').then(m => m.OccupationAnalysis)
      },
      {
        path: 'scenarios',
        loadComponent: () => import('./features/scenarios/pages/scenario-list/scenario-list').then(m => m.ScenarioList)
      },
      {
        path: 'data-management',
        loadComponent: () => import('./features/data-management/pages/datasets/datasets').then(m => m.Datasets)
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/reports/pages/report-list/report-list').then(m => m.ReportList)
      },
      {
        path: 'alerts',
        loadComponent: () => import('./features/alerts/pages/alert-list/alert-list').then(m => m.AlertList)
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/pages/general/general').then(m => m.GeneralSettings)
      },
      {
        path: 'assistant',
        loadComponent: () => import('./features/assistant-ai/pages/assistant/assistant').then(m => m.AssistantAI)
      },
      {
        path: 'users',
        loadComponent: () => import('./core/users/pages/user-list/user-list').then(m => m.UserList)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
