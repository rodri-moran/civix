import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, RouterOutlet } from '@angular/router';
import { NewResponseDto } from '../../dtos/NewResponseDto.dto';
import { NewService } from '../../services/new.service';

@Component({
  selector: 'CitizenHome',
  imports: [FormsModule, CommonModule, RouterLink, RouterOutlet],
  standalone: true,
  templateUrl: './citizen-home.html',
  styleUrl: './citizen-home.css',
})
export class CitizenHome {
  noticias: NewResponseDto[] = [];
  constructor(private router: Router, private newService: NewService) {}
  isAdmin: boolean = false;
  isSupervisor: boolean = false;

  ngOnInit() {
    const role = localStorage.getItem('role');
    console.log('ROL:', role);
    this.isAdmin = role === 'ADMIN';
    this.isSupervisor = role === 'CUADRILLA';
    this.loadNews();
  }
  userName: string = 'Usuario';

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  loadNews() {
    this.newService.getAllNews().subscribe((response) => {
      this.noticias = response;
    });
  }

  getBadgeColor(category: string): string {
    switch (category) {
      case 'Tecnología':
        return 'bg-primary text-white';

      case 'Gestión Pública':
        return 'bg-secondary text-white';

      case 'Capacitación':
        return 'bg-warning text-dark';

      case 'Transparencia':
        return 'bg-info text-dark';

      case 'Obras y Servicios':
        return 'bg-dark text-white';

      case 'Seguridad':
        return 'bg-danger text-white';

      case 'Ambiente':
        return 'bg-success text-white';

      case 'Economía':
        return 'bg-light text-dark';

      case 'Alumbrado':
        return 'bg-warning-subtle text-dark';

      case 'Recolección':
      case 'RECOLECCION':
        return 'bg-success-subtle text-dark';

      default:
        return 'bg-secondary text-white';
    }
  }
}
