import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';  
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoaderComponent } from "../../shared/loader/loader";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, LoaderComponent],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  isLoading = false;  
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: Auth, private router: Router) {}

  ngOnInit() {
  document.body.classList.add('login-page');
}

ngOnDestroy() {
  document.body.classList.remove('login-page');
}

  onSubmit() {
    this.isLoading = true;
    console.log('email: '+this.email)

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token); 
        localStorage.setItem('userId', response.userId.toString());
        localStorage.setItem('role', response.role);
        localStorage.setItem('userName', `${response.name} ${response.lastName}`);
        this.isLoading = false;
        this.router.navigate(["/citizen-dashboard"])
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.errorMessage = 'Credenciales inválidas';
      }
    });
  }
}
