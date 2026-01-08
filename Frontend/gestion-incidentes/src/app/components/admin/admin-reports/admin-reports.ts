import { Component, OnInit, HostListener } from '@angular/core';
import { ReportServiceService } from '../../../services/report-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Squad } from '../../../dtos/SquadDto.dto';

declare var bootstrap: any;
interface Report {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  status: string;
  createdAt: string;
  squad?: Squad;
  imageUrl?: string;
}

@Component({
  selector: 'app-admin-reports',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './admin-reports.html',
  styleUrl: './admin-reports.css',
})
export class AdminReports implements OnInit {
  //statusMap es un objeto literal (como un diccionario o mapa).
  //Cada clave (PENDING, IN_PROCESS, RESOLVED) representa el valor que llega del backend.
  //Cada valor asociado es otro objeto que tiene dos propiedades:
  //text: el texto que se quiere mostrar en el front (en español).
  //class: la clase de Bootstrap que define el color del badge.

  //Entonces, si el backend devuelve IN_PROCESS, se puede acceder a:
  //statusMap["IN_PROCESS"].text → "En proceso"
  //statusMap["IN_PROCESS"].class → "bg-warning text-dark"
  statusMap: { [key: string]: { text: string; class: string } } = {
    PENDING: { text: 'Pendiente', class: 'bg-primary' },
    IN_PROCESS: { text: 'En proceso', class: 'bg-warning text-dark' },
    RESOLVED: { text: 'Resuelto', class: 'bg-success' },
  };
  private map!: L.Map;
  reports: Report[] = [];
  allReports: Report[] = [];
  squads: Squad[] = [];
  isAssigning = false;

  constructor(private service: ReportServiceService) {}

  ngOnInit(): void {
    this.service.getSquads().subscribe({
      next: (data) => {
        this.squads = data;
      },
      error: (err) => {
        console.error('Error cargando cuadrillas', err);
      },
    });

    this.service.getReports().subscribe({
      next: (data) => {
        console.log('Reportes recibidos: ' + data);
        const sorted = data.sort((a, b) => {
          const estadoOrden = getEstadoOrden(a.status) - getEstadoOrden(b.status);
          if (estadoOrden !== 0) return estadoOrden;

          const fechaA = new Date(a.createdAt).getTime();
          const fechaB = new Date(b.createdAt).getTime();
          return fechaB - fechaA;
        });

        this.allReports = sorted;
        this.reports = [...sorted];
      },
      error: (err) => {
        console.log('Error al obtener los reportes: ', err);
      },
    });
  }
  selectedReport?: Report;
  selectedSquadId?: number;
  reportToDetail?: Report;
  statusKeys = Object.keys(this.statusMap);
  openDropdownId: number | null = null;
  dropdownPosition: { top: string; left: string } = { top: '0px', left: '0px' };

  toggleDropdown(reportId: number, event: MouseEvent) {
    if (this.openDropdownId === reportId) {
      this.openDropdownId = null;
      return;
    }

    this.openDropdownId = reportId;

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    this.dropdownPosition = {
      top: `${rect.bottom + 6}px`,
      left: `${rect.left}px`,
    };
  }

  onStatusSelect(report: any, newStatus: string) {
    report.status = newStatus;
    this.openDropdownId = null;

    this.service.updateStatus(report.id, newStatus).subscribe({
      next: (data) => {
        console.log('Estado de reporte actualizado: ' + data);
      },
      error: (err) => {
        console.log('Error actualizando el estado del reporte: ', err);
      },
    });
  }
  openAssignModal(reporte: Report) {
    this.selectedReport = reporte;
    this.selectedSquadId = reporte.squad?.id;
  }

  assignSquad() {
    if (!this.selectedReport || !this.selectedSquadId || this.isAssigning) return;
    const selectedSquad = this.squads.find((s) => s.id === this.selectedSquadId);
    if (!selectedSquad) return;

    this.isAssigning = true;

    this.service.assignSquadToReport(this.selectedReport.id, this.selectedSquadId).subscribe({
      next: (data) => {
        console.log('respuesta de back al asignar squad a report: ' + data);
        this.selectedReport!.squad = selectedSquad;
        this.selectedReport!.status = 'IN_PROCESS';
        this.showMessage(true, 'La cuadrilla fue asignada correctamente al reporte.');

        this.isAssigning = false;
        this.closeAssignModal();
      },
      error: (err) => {
        console.error('Error al asignar cuadrilla', err);
        this.showMessage(false, 'Hubo un error al asignar la cuadrilla. Intenta nuevamente.');
        this.isAssigning = false;
      },
    });

    const modalEl = document.getElementById('assignModal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal?.hide();
    }
  }
  selectedSquad?: Squad;

  onSquadChange() {
    this.selectedSquad = this.squads.find((s) => s.id === this.selectedSquadId);
  }

  closeAssignModal() {
    const modalEl = document.getElementById('assignModal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal?.hide();
    }

    this.selectedSquadId = undefined;
  }

  isSuccess: boolean = true;
  messageText: string = '';

  showMessage(isSuccess: boolean, text: string) {
    this.isSuccess = isSuccess;
    this.messageText = text;

    const modalEl = document.getElementById('messageModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  openDetailModal(report: Report) {
    this.reportToDetail = report;

    setTimeout(() => {
      if (this.reportToDetail?.latitude != null && this.reportToDetail.longitude != null) {
        if (this.map) {
          this.map.remove();
        }

        this.map = L.map('map').setView(
          [this.reportToDetail.latitude, this.reportToDetail.longitude],
          13
        );

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(this.map);

        L.marker([this.reportToDetail.latitude, this.reportToDetail.longitude])
          .addTo(this.map)
          .bindPopup('Ubicación del reporte');
      }

      setTimeout(() => this.map.invalidateSize(), 200);
    }, 50);
  }

  filterByStatus(status?: string) {
    if (!status || status === 'ALL') {
      this.reports = [...this.allReports];
      return;
    }

    this.reports = this.allReports.filter((report) => report.status === status);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.dropdown, .badge.cursor-pointer');
    if (!clickedInside) {
      this.openDropdownId = null;
    }
  }

  selectedMobileReport?: Report;

openMobileStatusModal(report: Report) {
  this.selectedMobileReport = report;

  const modalEl = document.getElementById('mobileStatusModal');
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}

onMobileStatusSelect(status: string) {
  if (!this.selectedMobileReport) return;

  this.onStatusSelect(this.selectedMobileReport, status);

  const modalEl = document.getElementById('mobileStatusModal');
  if (modalEl) {
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal?.hide();
  }
}



}
function getEstadoOrden(status: string): number {
  switch (status.toLowerCase()) {
    case 'PENDING':
      return 0;
    case 'IN_PROCESS':
      return 1;
    case 'RESOLVED':
      return 2;
    default:
      return 99;
  }
}
