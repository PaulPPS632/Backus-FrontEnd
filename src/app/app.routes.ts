import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/website/website.routes').then(
        (m) => m.WebsiteRoutesModule
      ),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/dashboard/dashboard.routes').then(
        (m) => m.DashboardRoutesModule
      ),
    data: {
      title: 'Dashboard',
      roles: ['administrador', 'almacenero', 'vendedor'],
    },
  },
  {
    path: 'panel',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/panelcliente/panel.routes').then(
        (m) => m.PanelRoutesModule
      ),
    data: {
      title: 'Panel',
      roles: [
        'empresa',
        'persona natural',
        'persona juridica',
        'administrador',
      ],
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
