import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const userData = this.authService.getUserData();
    if (userData) {
      const currentUrl = this.router.url;
      if (currentUrl.includes('empleador-dashboard') && userData.tipo !== 'empleador') {
        this.router.navigate(['/login']);
        return false;
      }
      if (currentUrl.includes('trabajador-dashboard') && userData.tipo !== 'trabajador') {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}