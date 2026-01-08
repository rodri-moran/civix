import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../../services/auth';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-citizen-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './citizen-layout.html',
  styleUrls: ['./citizen-layout.css'],
})
export class CitizenLayoutComponent {
  isSidebarCollapsed = false;
  isLoggedIn: boolean = false;
  userName: string = 'Invitado';
  isOpen: boolean = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  constructor(private authService: Auth, private router: Router, private cd: ChangeDetectorRef) {}
  roleLabel = '';
  isAdmin: boolean = false;
  isSupervisor: boolean = false;

  ngOnInit() {
    const token = localStorage.getItem('token');
    const role = this.authService.getRole();
    const storedName = localStorage.getItem('userName');

    if (token && !this.authService.isTokenExpired()) {
      this.isLoggedIn = true;
      this.isAdmin = role === 'ADMIN';
      this.isSupervisor = role === 'CUADRILLA';
      this.userName = storedName || 'Usuario';
      this.cd.detectChanges();
    } else {
      this.authService.logout();
      this.isLoggedIn = false;
      this.userName = 'Invitado';
      this.router.navigate(['/login']);
    }
    if(this.isAdmin) {
      this.roleLabel = 'Administrador';
    } else if(this.isSupervisor) {
      this.roleLabel = 'Responsable de Cuadrilla';
    } else {
      this.roleLabel = 'Ciudadano'
    }

    console.log('token válido?', token, 'isLoggedIn:', this.isLoggedIn);
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
