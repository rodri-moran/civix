import { Component, OnInit, HostListener } from '@angular/core';
import { ReportServiceService } from '../../services/report-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { IventoryServiceService } from '../../services/iventory-service.service';
import { ResourceDto } from '../../dtos/ResourceDto';
import { Squad } from '../../dtos/SquadDto.dto';
import { SquadServiceService } from '../../services/squad-service.service';
import { RouterLink } from '@angular/router';
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
  selector: 'app-cuadrilla',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cuadrilla.component.html',
  styleUrl: './cuadrilla.component.css',
})
export class CuadrillaComponent implements OnInit {
  statusMap: { [key: string]: { text: string; class: string } } = {
    PENDING: { text: 'Pendiente', class: 'bg-primary' },
    IN_PROCESS: { text: 'En proceso', class: 'bg-warning text-dark' },
    RESOLVED: { text: 'Resuelto', class: 'bg-success' },
  };
  private map!: L.Map;
  resources: ResourceDto[] = [];
  reports: Report[] = [];
  allReports: Report[] = [];
  reportPendingResolve?: Report;
  resourcesUsed: {
    resourceId: number | null;
    quantity: number;
  }[] = [];
  squads: Squad[] = [];
  loading = false;
  errorMessage: string = '';
  dropdownPosition = { top: '0px', left: '0px' };

  constructor(
    private service: ReportServiceService,
    private inventoryService: IventoryServiceService,
    private squadService: SquadServiceService
  ) {}

  ngOnInit(): void {
    this.loadSquads();

    this.service.getReportsForSupervisor().subscribe({
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

  reportToDetail?: Report;
  statusKeys = Object.keys(this.statusMap);
  openDropdownId: number | null = null;

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
  onStatusSelect(report: Report, newStatus: string) {
    report.status = newStatus;
    this.openDropdownId = null;

    if (newStatus === 'RESOLVED') {
      this.inventoryService.getAllResources().subscribe({
        next: (data) => {
          this.resources = data;
        },
        error: (err) => console.error('Error al traer recursos: ', err),
      });
      this.reportPendingResolve = report;
      this.openResourcesModal();
      return;
    }

    this.service.updateStatus(report.id, newStatus).subscribe({
      next: (data) => {
        console.log('Estado de reporte actualizado: ' + data);
      },
      error: (err) => {
        console.log('Error actualizando el estado del reporte: ', err);
      },
    });
  }

  openResourcesModal() {
    const modalEl = document.getElementById('resourcesModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  isSuccess: boolean = true;
  messageText: string = '';

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

  addResource() {
    this.resourcesUsed.push({
      resourceId: null,
      quantity: 1,
    });
  }

  removeResource(index: number) {
    this.resourcesUsed.splice(index, 1);
  }

  confirmResolve() {
    if (!this.reportPendingResolve) return;

    const dto = {
      items: this.resourcesUsed
        .filter((r) => r.resourceId !== null && r.quantity > 0)
        .map((r) => ({
          resourceId: r.resourceId!,
          quantity: r.quantity,
        })),
      typeMovement: 'SALIDA',
      userId: Number(localStorage.getItem('userId')),
      reportId: this.reportPendingResolve.id,
      reason: 'Resolución de reporte',
    };

    this.service.updateStatus(this.reportPendingResolve.id, 'RESOLVED', dto).subscribe({
      next: () => {
        this.reportPendingResolve!.status = 'RESOLVED';
        this.closeResourcesModal();
        this.resourcesUsed = [];
        this.reportPendingResolve = undefined;
      },
      error: (err) => console.error(err),
    });
  }

  closeResourcesModal() {
    const modalEl = document.getElementById('resourcesModal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal?.hide();
    }
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

  private loadSquads(): void {
    this.loading = true;

    this.squadService.getSquadsForSupervisor().subscribe({
      next: (data) => {
        this.squads = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando cuadrillas del supervisor', err);
        this.errorMessage = 'No se pudieron cargar las cuadrillas.';
        this.loading = false;
      },
    });
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
