import { Routes } from '@angular/router';
import { ScrollV1 } from './scroll-v1/scroll-v1';
import { ScrollV2 } from './scroll-v2/scroll-v2';
import { ScrollV3 } from './scroll-v3/scroll-v3';
import { GridSystem } from './grid-system/grid-system';
import { IconSystem } from './icon-system/icon-system';
import { Components } from './components/components';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'components',
    pathMatch: 'full',
  },
  {
    path: 'scroll-v1',
    component: ScrollV1,
  },
  {
    path: 'scroll-v2',
    component: ScrollV2,
  },
  {
    path: 'scroll-v3',
    component: ScrollV3,
  },
  {
    path: 'grid-system',
    component: GridSystem,
  },
  {
    path: 'icon-system',
    component: IconSystem,
  },
  {
    path: 'components',
    component: Components,
  },
];
