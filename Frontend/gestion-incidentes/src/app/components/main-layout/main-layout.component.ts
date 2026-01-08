import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  sidebarCollapsed = false;
  userName = 'Usuario';
  isAdmin = false;

  citizenMenu = [
    { title: 'Perfil', icon: 'bi bi-person-fill', route: '/perfil' },
    { title: 'Mis reportes', icon: 'bi bi-journal-text', route: '/mis-reportes' },
    { title: 'Reportar incidente', icon: 'bi bi-exclamation-octagon', route: '/reportar-incidente' },
    { title: 'Noticias', icon: 'bi bi-newspaper', route: '/noticias' },
    { title: 'Estadísticas', icon: 'bi bi-bar-chart', route: '/estadisticas' },
    { title: 'Configuración', icon: 'bi bi-gear', route: '/configuracion' }
  ];

  adminMenu = [
    { title: 'Dashboard', icon: 'bi bi-speedometer2', route: '/admin/dashboard' },
    { title: 'Reportes', icon: 'bi bi-exclamation-triangle', route: '/admin/reportes' },
    { title: 'Cuadrillas', icon: 'bi bi-people-fill', route: '/admin/cuadrillas' },
    { title: 'Noticias', icon: 'bi bi-newspaper', route: '/admin/noticias' },
    { title: 'Estadísticas', icon: 'bi bi-bar-chart-fill', route: '/admin/estadisticas' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'ADMIN';
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
