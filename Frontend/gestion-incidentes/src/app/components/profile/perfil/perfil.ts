import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user-service.service';
import { UserDto } from '../../../dtos/UserDto.dto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil',
  styleUrls: ['./perfil.css'],
  standalone: true,
  templateUrl: './perfil.html',
  imports: [CommonModule, FormsModule, RouterLink],
})
export class PerfilComponent implements OnInit {
  user: UserDto = {
    name: '',
    lastName: '',
    email: '',
  };

  editedValues: any = {};

  isEditing = false;
  hasChanges = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.userService.getProfile().subscribe({
      next: (data) => {
        //esto está diciendo "creá un nuevo objeto con todas las propiedades que tiene data"
        this.user = { ...data };
        this.editedValues = { ...data };
      },
      error: (err) => console.error(err),
    });
  }

  toggleEdit() {
    if (this.isEditing) {
      this.editedValues = { ...this.user };
      this.hasChanges = false;
    }
    this.isEditing = !this.isEditing;
  }

  detectChanges() {
    this.hasChanges =
      this.user.name !== this.editedValues.name ||
      this.user.lastName !== this.editedValues.lastName ||
      this.user.phone !== this.editedValues.phone ||
      this.user.address !== this.editedValues.address;
  }

  saveChanges() {
    const dto = {
      name: this.editedValues.name,
      lastName: this.editedValues.lastName,
      phone: this.editedValues.phone,
      address: this.editedValues.address,
    };

    this.userService.updateProfile(dto).subscribe({
      next: (updated) => {
        this.user = { ...updated };
        this.editedValues = { ...updated };
        this.hasChanges = false;
        this.isEditing = false;
      },
      error: (err) => console.error('Error actualizando perfil', err),
    });
  }
}
