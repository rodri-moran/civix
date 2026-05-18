import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { LoaderComponent } from '../../shared/loader/loader';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink, LoaderComponent],
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
  isLoading = false;

  constructor(private authService: Auth, private router: Router) { }

  get passwordsDoNotMatch(): boolean {
    return this.passwordHash !== this.confirmPassword;
  }

  ngOnInit() {
    document.body.classList.add('register-page');
  }

  ngOnDestroy() {
    document.body.classList.remove('register-page');
  }

  onSubmit(registerForm: NgForm) {
  this.errorMessage = '';

  if (registerForm.invalid || !this.isRegisterFormValid) {
    registerForm.control.markAllAsTouched();

    if (this.passwordsDoNotMatch) {
      this.errorMessage = 'Las contraseñas no coinciden';
    }

    return;
  }

  this.isLoading = true;

  const name = this.name.trim();
  const lastName = this.lastName.trim();
  const email = this.email.trim();

  this.authService
    .register(name, lastName, email, this.passwordHash, this.role)
    .subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId.toString());
        localStorage.setItem('role', response.role);
        localStorage.setItem('userName', `${response.name} ${response.lastName}`);

        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.errorMessage = 'Error al registrar el usuario';
      },
    });
}

  get isRegisterFormValid(): boolean {
    const nameIsValid =
      this.name.trim().length > 0 &&
      this.name.trim().length <= 50;

    const lastNameIsValid =
      this.lastName.trim().length <= 50;

    const emailIsValid =
      this.email.trim().length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim());

    const passwordIsValid =
      this.passwordHash.length >= 8 &&
      this.passwordHash.length <= 72;

    const confirmPasswordIsValid =
      this.confirmPassword.length >= 8 &&
      this.confirmPassword.length <= 72;

    const passwordsMatch =
      this.passwordHash === this.confirmPassword;

    return (
      nameIsValid &&
      lastNameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      confirmPasswordIsValid &&
      passwordsMatch
    );
  }
}