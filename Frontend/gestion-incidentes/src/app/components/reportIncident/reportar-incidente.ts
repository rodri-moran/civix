import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../../services/auth';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ResponseDto } from '../../dtos/ReportResponseDto.dto';
import { ReportServiceService } from '../../services/report-service.service';

declare const bootstrap: any;

@Component({
  selector: 'app-reportar-incidente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportar-incidente.html',
  styleUrls: ['./reportar-incidente.css'],
})
export class ReportarIncidente {
  private currentMarker?: L.Marker;

  @ViewChild('registerForm') registerForm!: NgForm;

  title: string = '';
  description: string = '';
  address: string = '';
  userId: number = Number(localStorage.getItem('userId'));
  longitude?: number;
  latitude?: number;

  isLoggedIn: boolean = false;

  private map!: L.Map;

  constructor(private service: ReportServiceService, private authService: Auth) {}

  ngOnInit() {
    const token = this.authService.getToken();
    this.isLoggedIn = !!token;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.map = L.map('map').setView([-31.4167, -64.1833], 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map);

      this.map.on('click', (e: any) => {
        const { lat, lng } = e.latlng;
        this.latitude = lat;
        this.longitude = lng;

        if (this.currentMarker) {
          this.map.removeLayer(this.currentMarker);
        }
        this.currentMarker = L.marker([lat, lng]).addTo(this.map);
      });
    }, 50);
  }

  onSubmit(): void {
    console.log('longitud: ', this.longitude, 'latitud: ', this.latitude);
    if (!this.title || !this.description || !this.address || !this.latitude || !this.longitude) {
      this.showErrorModal();
      return;
    }

    this.service
      .createReport(
        this.title,
        this.description,
        this.address,
        this.latitude,
        this.longitude,
        this.userId
      )
      .subscribe({
        next: (response) => {
          console.log('response: ', response);
          this.showSuccessModal();

          try {
            this.registerForm.resetForm();
          } catch (e) {
            console.warn('registerForm no inicializado para resetear:', e);
          }

          this.title = '';
          this.description = '';
          this.address = '';
        },
        error: (err) => {
          console.error('Error al crear reporte', err);
          this.showErrorModal();
        },
      });
  }

  private showSuccessModal(): void {
    const el = document.getElementById('successModal');
    if (!el) {
      alert('Reporte enviado correctamente');
      return;
    }

    const modal = new bootstrap.Modal(el);
    modal.show();
    setTimeout(() => modal.hide(), 3000);
  }

  private showErrorModal(): void {
    const el = document.getElementById('errorModal');
    if (!el) {
      alert('Error al enviar el reporte');
      return;
    }
    const modal = new bootstrap.Modal(el);
    modal.show();
  }
}
