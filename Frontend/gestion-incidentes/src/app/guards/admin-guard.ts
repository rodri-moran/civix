import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Auth } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private authService: Auth) {}

  canActivate(): boolean {
    const token = this.authService.getToken();

    if (!token || this.authService.isTokenExpired()) {
      this.authService.logout;
      this.router.navigate(['/login']);
      return false;
    }

    const role = this.authService.getRole();

    if (role === 'ADMIN') {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}
