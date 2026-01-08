import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name: string = '';
  lastName: string = '';
  email: string = '';
  passwordHash: string = '';
  confirmPassword: string = '';
  role: string = 'CIUDADANO';
  errorMessage: string = '';

  emailControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private authService: Auth, private router: Router) {}

  ngOnInit() {
    document.body.classList.add('register-page');
  }

  ngOnDestroy() {
    document.body.classList.remove('register-page');
  }

  onSubmit() {
    if (this.passwordHash != this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.authService
      .register(this.name, this.lastName, this.email, this.passwordHash, this.role)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userName', `${response.name} ${response.lastName}`);

          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Error al registrar el usuario';
        },
      });
  }
}
