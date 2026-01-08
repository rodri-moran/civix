import { AdminLayoutComponent } from "./admin-layout/admin-layout";
import { AdminReports } from "./admin-reports/admin-reports";
import { NewsComponent } from "../news/news.component";
import { SquadsComponentComponent } from "./squads-component/squads-component.component";
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminReports }, 
      { path: 'reportes', component: AdminReports },
      { path: 'cuadrillas', component: SquadsComponentComponent },
      { path: 'noticias', component: NewsComponent }
    ]
  }
];
