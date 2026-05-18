import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../../services/auth';
import * as L from 'leaflet';
//import 'leaflet/dist/leaflet.css';
import { ResponseDto } from '../../dtos/ReportResponseDto.dto';
import { ReportServiceService } from '../../services/report-service.service';
import { LoaderComponent } from '../../shared/loader/loader';

declare const bootstrap: any;

@Component({
  selector: 'app-reportar-incidente',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent],
  templateUrl: './reportar-incidente.html',
  styleUrls: ['./reportar-incidente.css'],
})
export class ReportarIncidente {
  private currentMarker?: L.Marker;

  @ViewChild('registerForm') registerForm!: NgForm;

  title: string = '';
  description: string = '';
  address: string = '';
  longitude?: number;
  latitude?: number;
  isLoading = false;  
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
    if (!this.title || !this.description || !this.address || !this.latitude || !this.longitude) {
      this.showErrorModal();
      return;
    }
      this.isLoading = true;


    this.service
      .createReport(
        this.title,
        this.description,
        this.address,
        this.latitude,
        this.longitude
      )
      .subscribe({
        next: (response) => {
          this.showSuccessModal();
          
          try {
            this.registerForm.resetForm();
          } catch (e) {
            console.warn('registerForm no inicializado para resetear:', e);
          }

          this.title = '';
          this.description = '';
          this.address = '';

          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error al crear reporte', err);
          this.showErrorModal();
          this.isLoading = false;

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
