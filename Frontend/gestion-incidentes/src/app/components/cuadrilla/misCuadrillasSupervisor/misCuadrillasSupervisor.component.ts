import { Component, OnInit } from '@angular/core';
import { Squad } from '../../../dtos/SquadDto.dto';
import { SquadServiceService } from '../../../services/squad-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-misCuadrillasSupervisor',
  templateUrl: './misCuadrillasSupervisor.component.html',
  styleUrls: ['./misCuadrillasSupervisor.component.css'],
  imports: [CommonModule, RouterLink]
})
export class MisCuadrillasSupervisorComponent implements OnInit {

  squads: Squad[] = [];
  loading = false;
  errorMessage = '';

  constructor(private squadService: SquadServiceService) {}

  ngOnInit(): void {
    this.loadSquads();
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
      }
    });
  }

}
