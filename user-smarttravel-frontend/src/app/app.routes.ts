import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'recommendations',
    loadComponent: () =>
      import('./recommendations/recommendations.component').then((m) => m.RecommendationsComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
