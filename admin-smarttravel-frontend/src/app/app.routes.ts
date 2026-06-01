import { Routes } from '@angular/router';
import { FallbackComponent } from './shared/fallback/fallback';
import { LoginComponent } from './admin/login/login';
import { RegisterComponent } from './admin/register/register';
import { DashboardComponent } from './admin/dashboard/dashboard';
import { DatabaseComponent } from './admin/database/database';
import { OffersTableComponent } from './admin/database/offers-table/offers-table';
import { FlightsTableComponent } from './admin/database/flights-table/flights-table';
import { AccommodationsTableComponent } from './admin/database/accommodations-table/accommodations-table';
import { AuthGuard } from './auth/auth.guard';
import { AirportsTableComponent } from './admin/database/airports-table/airports-table';
import { LocationsTableComponent } from './admin/database/locations-table/locations-table';

export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () =>
      import('./shared/admin-layout/admin-layout').then((m) => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },

      {
        path: 'register',
        component: RegisterComponent,
      },

      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent,
      },

      {
        path: 'database',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: DatabaseComponent,
          },
          {
            path: 'offers',
            component: OffersTableComponent,
          },
          {
            path: 'flights',
            component: FlightsTableComponent,
          },
          {
            path: 'accommodations',
            component: AccommodationsTableComponent,
          },
          {
            path: 'airports',
            component: AirportsTableComponent,
          },
          {
            path: 'locations',
            component: LocationsTableComponent,
          },
        ],
      },
    ],
  },

  {
    path: '**',
    loadComponent: () => import('./shared/fallback/fallback').then((m) => m.FallbackComponent),
  },
];
