import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReportServiceService } from '../../services/report-service.service';

interface Report {
  id: number;
  title: string;
  description: string;
  address: string;
  status: string;
  createdAt: string;
}

@Component({
  selector: 'app-mis-reportes',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './mis-reportes.html',
  styleUrl: './mis-reportes.css',
})
export class MisReportes {
  statusLabels: any = {
    PENDING: { text: 'Pendiente', class: 'bg-primary text-white' },
    IN_PROCESS: { text: 'En proceso', class: 'bg-warning text-dark' },
    RESOLVED: { text: 'Resuelto', class: 'bg-success text-white' },
  };
  reports: Report[] = [];

  constructor(private service: ReportServiceService) {}
  ngOnInit() {
    this.service.getReportsByUserId().subscribe({
      next: (data) => {
        this.reports = data;
      },
      error: (err) => {
        console.error('Error cargando reportes', err);
      },
    });
  }
}
