import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const LoggedOutGuard: CanActivateFn = () => {
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if(token){
    router.navigate(['/'])
    return false;
  }
  return true;
};