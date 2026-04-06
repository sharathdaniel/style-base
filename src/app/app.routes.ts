import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing').then((m) => m.Landing),
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout').then((m) => m.MainLayout),
    children: [
      {
        path: 'demo',
        loadChildren: () => import('./pages/demo/demo.routes').then((m) => m.routes),
      },
    ],
  },
];
