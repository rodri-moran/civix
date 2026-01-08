import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IventoryServiceService } from '../../../services/iventory-service.service';
import { InventoryMovementDto, TypeMovement } from '../../../dtos/inventory-movement.dto';
import { ResourceDto } from '../../../dtos/ResourceDto';
import { InventoryMovementResponseDto } from '../../../dtos/InventoryMovementResponse.dto';
import { ResourceCreateDto } from '../../../dtos/resource-create.dto';

declare const bootstrap: any;
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})

export class InventoryComponent implements OnInit {
  
  newResource : ResourceCreateDto = {
  name : '',
  description: '',
  stock: 0,
  unit: '',
  area: ''
}
movement = {
  typeMovement: 'ENTRADA' as TypeMovement,
  reason: '',
  resourceId: 0,
  quantity: 0
}

  resources: ResourceDto[] = []
  movements: InventoryMovementResponseDto[] = []

  areas = [
    'ALUMBRADO',
    'OBRAS',
    'RECOLECCION',
    'HERRAMIENTA',
    'OTRO'
  ];
  constructor(private inventoryService : IventoryServiceService) { }
 
  ngOnInit() {
    this.inventoryService.getAllResources().subscribe({
      next: (data) => {
        console.log('Recursos traídos de la BD: ', data)
        this.resources = data;
      },
      error: (err) => {
        console.error('Error al traer recursos: ', err)
      }
    })
  }

  createResource() {
    this.inventoryService.createResource(this.newResource).subscribe({
      next: (data) => {
        this.refreshResources();

         this.newResource = {
          name: '',
          description: '',
          stock: 0,
          unit: '',
          area: ''
        };
      },
      error: (err) => {
        console.error('Error al crear recurso: ' ,err);
      }
    })
  }

  saveMovement() {
    const userId = Number(localStorage.getItem('userId'));

    const dto: InventoryMovementDto = {
      typeMovement: this.movement.typeMovement,
      reason: this.movement.reason,
      userId: userId,
      reportId: null,
      movementDetail: [{
        resourceId: this.movement.resourceId,
        quantity: this.movement.quantity
      }]
    }

    this.inventoryService.registerMovement(dto).subscribe({
      next: () => {

        this.showSuccesMovementModal();

        this.refreshResources();

        this.movement = { typeMovement: 'ENTRADA', reason: '', resourceId: 0, quantity: 0 };
      },
      error: (err) => {
        this.showErrorMovementModal();
        console.error('error al registrar movimiento: ',err)
      }
    })
  }

  loadMovements(){
    this.inventoryService.getAllMovements().subscribe({
      next: (data) => {
        console.log('Historial de movimientos: ', data)
        this.movements = data;
      },
      error: (err) => {
        console.error('Error al traer movimientos: ', err)
      }
    })
  }

  showSuccesMovementModal(): void {
    const el = document.getElementById('successModalMovement')
    const mo = document.getElementById('movementModal'); 
    const successModal  = new bootstrap.Modal(el);

    const movementModal =
    bootstrap.Modal.getInstance(mo) || new bootstrap.Modal(mo);
    movementModal.hide();

    successModal .show();
    setTimeout(() => successModal .hide(), 3000);
  }

  showErrorMovementModal(): void {
    const el = document.getElementById('errorModalMovement')
    const modal = new bootstrap.Modal(el);
    modal.show();
    setTimeout(() => modal.hide(), 3000);

  }

  refreshResources() {
  this.inventoryService.getAllResources().subscribe({
    next: (data) => {
      this.resources = data;
    },
    error: (err) => console.error('Error al refrescar recursos: ', err)
  });
}

deleteResource(): void {
  const el = document.getElementById('deleteModal')
  
  const successModal  = new bootstrap.Modal(el);

  successModal .show();
}

selectedResourceId: number | null = null;

openDeleteModal(id: number) {
  this.selectedResourceId = id;
}

confirmDelete() {
  if (!this.selectedResourceId) return;

  this.inventoryService.deleteResource(this.selectedResourceId).subscribe({
    next: () => {
      
      const modalEl = document.getElementById('deleteModal');
      const modalInstance = bootstrap.Modal.getInstance(modalEl!);
      modalInstance?.hide();
      
      this.refreshResources();
      this.showSucessDeleteResourceToast();

      this.selectedResourceId = null;
    },
    error: err => {
      this.showErrorDeleteToast();
      console.error('Error al eliminar recurso: ', err);
     
    }
  });
}

  showSucessDeleteResourceToast() {
    const toastEl = document.getElementById('toastSuccess');
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
      toast.show();
    }
  }

  showErrorDeleteToast() {
    const toastEl = document.getElementById('toastError');
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
      toast.show();
    }
  }
}