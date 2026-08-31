import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { entityEditResolver } from './admin/database/entity-edit.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin/login',
  },
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
        loadComponent: () => import('./admin/login/login').then((m) => m.LoginComponent),
      },

      {
        path: 'register',
        loadComponent: () => import('./admin/register/register').then((m) => m.RegisterComponent),
      },

      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./admin/dashboard/dashboard').then((m) => m.DashboardComponent),
      },

      {
        path: 'database',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./admin/database/database').then((m) => m.DatabaseComponent),
          },
          {
            path: 'offers',
            loadComponent: () =>
              import('./admin/database/offers-table/offers-table').then(
                (m) => m.OffersTableComponent,
              ),
          },
          {
            path: 'offers/add',
            loadComponent: () =>
              import('./admin/database/entity-form/entity-form').then((m) => m.EntityFormComponent),
          },
          {
            path: 'offers/:id/edit',
            loadComponent: () =>
              import('./admin/database/entity-form/entity-form').then((m) => m.EntityFormComponent),
            data: {
              entityType: 'offers',
            },
            resolve: {
              entity: entityEditResolver,
            },
          },
          {
            path: 'flights',
            loadComponent: () =>
              import('./admin/database/flights-table/flights-table').then(
                (m) => m.FlightsTableComponent,
              ),
          },
          {
            path: 'flights/add',
            loadComponent: () =>
              import('./admin/database/entity-form/entity-form').then((m) => m.EntityFormComponent),
          },
          {
            path: 'flights/:id/edit',
            loadComponent: () =>
              import('./admin/database/entity-form/entity-form').then((m) => m.EntityFormComponent),
            data: {
              entityType: 'flights',
            },
            resolve: {
              entity: entityEditResolver,
            },
          },
          {
            path: 'accommodations',
            loadComponent: () =>
              import('./admin/database/accommodations-table/accommodations-table').then(
                (m) => m.AccommodationsTableComponent,
              ),
          },
          {
            path: 'accommodations/add',
            loadComponent: () =>
              import('./admin/database/entity-form/entity-form').then((m) => m.EntityFormComponent),
          },
          {
            path: 'accommodations/:id/edit',
            loadComponent: () =>
              import('./admin/database/entity-form/entity-form').then((m) => m.EntityFormComponent),
            data: {
              entityType: 'accommodations',
            },
            resolve: {
              entity: entityEditResolver,
            },
          },
          {
            path: 'airports',
            loadComponent: () =>
              import('./admin/database/airports-table/airports-table').then(
                (m) => m.AirportsTableComponent,
              ),
          },
          {
            path: 'airports/add',
            loadComponent: () =>
              import('./admin/database/entity-form/entity-form').then((m) => m.EntityFormComponent),
          },
          {
            path: 'airports/:id/edit',
            loadComponent: () =>
              import('./admin/database/entity-form/entity-form').then((m) => m.EntityFormComponent),
            data: {
              entityType: 'airports',
            },
            resolve: {
              entity: entityEditResolver,
            },
          },
          {
            path: 'locations',
            loadComponent: () =>
              import('./admin/database/locations-table/locations-table').then(
                (m) => m.LocationsTableComponent,
              ),
          },
          {
            path: 'locations/add',
            loadComponent: () =>
              import('./admin/database/entity-form/entity-form').then((m) => m.EntityFormComponent),
          },
          {
            path: 'locations/:id/edit',
            loadComponent: () =>
              import('./admin/database/entity-form/entity-form').then((m) => m.EntityFormComponent),
            data: {
              entityType: 'locations',
            },
            resolve: {
              entity: entityEditResolver,
            },
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
