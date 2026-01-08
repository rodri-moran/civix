import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SupervisorDto } from '../../../dtos/SupervisorDto.dto';
import { SquadServiceService } from '../../../services/squad-service.service';
import { Squad } from '../../../dtos/SquadDto.dto';
import { SquadRequest } from '../../../dtos/SquadRequestDto.dto';
declare const bootstrap: any;

interface Area {
  name: string;
}

@Component({
  selector: 'app-squads-component',
  templateUrl: './squads-component.component.html',
  imports: [CommonModule, FormsModule, RouterLink],
  styleUrls: ['./squads-component.component.css'],
})
export class SquadsComponentComponent {
  squads: Squad[] = [];
  areas: Area[] = [
    { name: 'ALUMBRADO' },
    { name: 'OBRAS' },
    { name: 'RECOLECCION' },
    { name: 'OTRA' },
  ];
  selectedArea: string = '';
  name: string = '';
  description: string = '';
  teamSize: number = 0;
  supervisors: SupervisorDto[] = [];
  supervisorUserId: number | null = null;

  constructor(private service: SquadServiceService) {}
  
  ngOnInit() {
   this.service.getSquads().subscribe({
        next: (data) => {
          this.squads = data;
        },
        error: (err) => {
          console.error("Error cargando cuadrillas", err);
      }})  

    this.service.getSupervisors().subscribe({
      next: (data) => (this.supervisors = data),
      error: (err) => console.error('Error cargando supervisores', err),
    });
  }

  onSubmit() {
    if (
      !this.name ||
      !this.description ||
      !this.selectedArea ||
      this.teamSize <= 0 ||
      !this.supervisorUserId
    ) {
      console.error('Formulario inválido');
      return;
    }
     const newSquad : SquadRequest = {
      name: this.name,
      description: this.description,
      area: this.selectedArea.toUpperCase(),
      teamSize: this.teamSize,
      supervisorUserId: this.supervisorUserId,
    };

    this.service.createSquad(newSquad).subscribe({
      next: (data) => {
        this.squads.push(data);
        this.resetForm();
        this.closeModal();
      },
      error: (err) => console.log('Error al crear cuadrilla', err),
    });
  }
  squadToEdit: Squad | null = null;
  idSquadToDelete: number | null = null;

  openEditModal(squad: Squad) {
    this.squadToEdit = { ...squad };
  }
  
  resetForm() {
    this.name = '';
    this.description = '';
    this.selectedArea = '';
    this.teamSize = 0;
    this.supervisorUserId = null;
  }
  closeModal() {
    const modalEl = document.getElementById('createModal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal?.hide();
    }
  }

  editSquad() {
    if (!this.squadToEdit) return;

    const { id, ...body } = this.squadToEdit;

    this.service.updateSquad(id, body).subscribe({
      next: (updateSquad) => {
        const index = this.squads.findIndex((s) => s.id === updateSquad.id);

        if (index !== -1) {
          this.squads[index] = updateSquad;
        }

        this.closeEditModal();
        this.showSuccessToast();
      },
      error: (err) => {
        this.showErrorToast();
      },
    });
  }

  closeEditModal() {
    const modalEl = document.getElementById('editModal');
    if (modalEl) {
      bootstrap.Modal.getInstance(modalEl)?.hide();
    }
    this.squadToEdit = null;
  }
  showSuccessToast() {
    const toastEl = document.getElementById('toastSuccess');
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
      toast.show();
    }
  }

  showErrorToast() {
    const toastEl = document.getElementById('toastError');
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
      toast.show();
    }
  }

  openDeleteModal(id: number) {
    this.idSquadToDelete = id;
  }

  confirmDelete() {
    if (!this.idSquadToDelete) return;

    this.service.deleteSquad(this.idSquadToDelete).subscribe({
      next: () => {
        this.squads = this.squads.filter((s) => s.id !== this.idSquadToDelete);
        this.closeDeleteModal();
        this.showSuccessDeleteToast();
      },
      error: () => {
        this.closeDeleteModal();
        this.showErrorDeleteToast();
      },
    });
  }

  showSuccessDeleteToast() {
    const toastEl = document.getElementById('toastSuccessDelete');
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
      toast.show();
    }
  }

  showErrorDeleteToast() {
    const toastEl = document.getElementById('toastErrorDelete');
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
      toast.show();
    }
  }

  closeDeleteModal() {
    const modalEl = document.getElementById('deleteModal');
    if (modalEl) {
      bootstrap.Modal.getInstance(modalEl)?.hide();
    }
    this.idSquadToDelete = null;
  }
}