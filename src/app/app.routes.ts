import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'demo',
    loadChildren: () => import('./pages/demo/demo.routes').then((m) => m.routes),
  },
];
