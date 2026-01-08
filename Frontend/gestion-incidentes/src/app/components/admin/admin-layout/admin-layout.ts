import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css'],
  imports: [CommonModule, RouterOutlet]
})
export class AdminLayoutComponent {
  
  userName: string = "Usuario";
  currentRoute = '';
  hasToken = false;
  isOpen = false

  menuItems = [
    { title: 'Reportes', icon: 'bi bi-exclamation-triangle', route: '/admin/reportes' },
    { title: 'Cuadrillas', icon: 'bi bi-people', route: '/admin/cuadrillas' },
    { title: 'Estadísticas', icon: 'bi bi-bar-chart', route: '/admin/estadisticas' },
    { title: 'Inventario', icon: 'bi bi-box-seam', route: 'admin/inventario'}
  ];
 ngOnInit() {
  const token = localStorage.getItem('token')
  const storedName = localStorage.getItem('userName');

  if (token && !this.authService.isTokenExpired()) {
    //this.isLoggedIn = true;
    this.hasToken = true;
    this.userName = storedName || 'Usuario';
    this.cd.detectChanges();
  } else {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

  constructor(private router: Router, private authService: Auth, private cd: ChangeDetectorRef) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => this.currentRoute = event.urlAfterRedirects);
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  navigate(route: string) {
    this.router.navigate([route]);
    this.isOpen = false;
  }

  goToCitizenDashboard() {
    this.router.navigate(['/citizen-dashboard']);
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  profile() {
    this.router.navigate(['/admin/perfil']);
  }
}