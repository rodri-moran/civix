import { Component, OnInit } from '@angular/core';
import { ReportServiceService, Report } from '../../../../services/report-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-admin-dashboard-component',
  imports: [CommonModule, FormsModule, RouterLink, RouterModule],
  templateUrl: './admin-dashboard-component.html',
  styleUrl: './admin-dashboard-component.css'
})
export class AdminDashboardComponent implements OnInit {
  reports: Report[] = [];

  constructor(private reportService : ReportServiceService, private router: Router,private route: ActivatedRoute) { }
   menuItems = [
  { title: 'Reportes', icon: 'bi bi-exclamation-triangle', route: 'reportes', description: 'Ver y gestionar reportes ciudadanos.' },
  { title: 'Cuadrillas', icon: 'bi bi-people', route: 'cuadrillas', description: 'Administrar y asignar cuadrillas.' },
  { title: 'Noticias', icon: 'bi bi-newspaper', route: 'noticias', description: 'Publicar y editar noticias locales.' },
  { title: 'Estadísticas', icon: 'bi bi-bar-chart', route: 'estadisticas', description: 'Visualizar métricas y actividad.' },
  { title: 'Inventario', icon: 'bi bi-box-seam', route: 'inventario', description: 'Gestionar recursos y stock.'}
];

  navigate(route: string) {
  this.router.navigate(['admin', route]);
}
  ngOnInit() {
    this.reportService.getReports().subscribe({
      next: (reports: any[]) => {
        this.reports = reports.map(r => ({
          
          ...r,
          
          createdAt: new Date(
            r.createdAt[0],
            r.createdAt[1] - 1,
            r.createdAt[2],
            r.createdAt[3],
            r.createdAt[4],
            r.createdAt[5],
            r.createdAt[6] / 1000000
          ),
          status: r.status === 'PENDING' ? 'PENDIENTE' : r.status
        }));       
        console.log('reports cargados:', this.reports);
      },
      error: (err) => {
        console.error("error cargando reports: ",err)
      }
    })
  }
}
