import { Routes } from '@angular/router';
import { AdminGuard } from './guards/admin-guard';
import { LoggedOutGuard } from './guards/logged-out-guard';

export const routes: Routes = [
  // ───────────────────────────────
  // RUTAS PÚBLICAS
  // ───────────────────────────────
  {
    path: 'login',
    canActivate: [LoggedOutGuard],
    loadComponent: () =>
      import('./components/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    canActivate: [LoggedOutGuard],
    loadComponent: () =>
      import('./components/register/register').then(m => m.Register)
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./components/unauthorized/unauthorized').then(
        m => m.Unauthorized
      )
  },

  // ───────────────────────────────
  // RUTAS DEL CIUDADANO (Layout)
  // ───────────────────────────────
  {
    path: '',
    loadComponent: () =>
      import('./components/layouts/citizen-layout/citizen-layout').then(
        m => m.CitizenLayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/citizen-home/citizen-home').then(
            m => m.CitizenHome
          )
      },
      {
      path: 'noticias',
      loadComponent: () =>
        import('./components/news/news.component').then(
          m => m.NewsComponent
        )
    },
      {
    path: 'faq',
    loadComponent: () =>
      import('./components/legal/faq/faq').then(m => m.Faq)
  },
  {
    path: 'perfil',
    loadComponent: () =>
      import('./components/profile/perfil/perfil').then(m => m.PerfilComponent)
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./components/legal/terms-and-conditions/terms-and-conditions').then(m => m.TermsAndConditions)
  },
      {
        path: 'mis-reportes',
        loadComponent: () =>
          import('./components/misReportes/mis-reportes').then(
            m => m.MisReportes
          )
      },
      {
        path: 'reportar-incidente',
        loadComponent: () =>
          import('./components/reportIncident/reportar-incidente').then(
            m => m.ReportarIncidente
          )
      },
      {
        path: 'estadisticas',
        loadComponent: () =>
          import('./components/statistics/statistics.component').then(
            m => m.StatisticsComponent
          )
      },
        {
        path: 'cuadrilla',
        loadComponent: () =>
          import('./components/cuadrilla/cuadrilla.component').then(
            m => m.CuadrillaComponent
          )
      },
      {
        path: 'misCuadrillas',
        loadComponent: () =>
          import('./components/cuadrilla/misCuadrillasSupervisor/misCuadrillasSupervisor.component').then(
            m => m.MisCuadrillasSupervisorComponent
          )
      }
    ]
  },

  // ───────────────────────────────
  // RUTAS DEL ADMIN (Layout + Guard)
  // ───────────────────────────────
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadComponent: () =>
      import('./components/admin/admin-layout/admin-layout').then(
        m => m.AdminLayoutComponent
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },

      {
        path: 'perfil',
        loadComponent: () =>
          import('./components/profile/perfil/perfil').then(
            m => m.PerfilComponent
          )
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import(
            './components/admin/dashboard/admin-dashboard-component/admin-dashboard-component'
          ).then(m => m.AdminDashboardComponent)
      },
      {
        path: 'estadisticas',
        loadComponent: () =>
          import('./components/statistics/statistics.component').then(
            m => m.StatisticsComponent
          )
      },
      {
        path: 'reportes',
        loadComponent: () =>
          import('./components/admin/admin-reports/admin-reports').then(
            m => m.AdminReports
          )
      },
      {
        path: 'inventario',
        loadComponent: () =>
          import('./components/admin/inventory/inventory.component').then(
            m => m.InventoryComponent
          )
      },
      {
        path: 'cuadrillas',
        loadComponent: () =>
          import(
            './components/admin/squads-component/squads-component.component'
          ).then(m => m.SquadsComponentComponent)
      },
      
      {
        path: 'noticias',
        loadComponent: () =>
          import('./components/news/news.component').then(
            m => m.NewsComponent
          )
      }
    ]
  },

  // ───────────────────────────────
  // FALLBACK
  // ───────────────────────────────
  { path: '**', redirectTo: '' }
];
