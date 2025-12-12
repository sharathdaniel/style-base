import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'users',
        loadChildren: () => import('./pages/users/users.routes').then(m => m.routes)
    }
];
