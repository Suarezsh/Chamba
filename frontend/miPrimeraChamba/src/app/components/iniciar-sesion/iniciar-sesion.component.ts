import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) {}

  iniciarSesion(form: NgForm) {
    if (form.valid) {
      this.authService.iniciarSesion(this.email, this.password).subscribe(
        (response: any) => {
          this.cookieService.set('userId', response.id);
          this.router.navigate(['/dashboard']);  // Redirigir al componente dashboard
        },
        (error: any) => {
          this.errorMessage = error.error.error;
        }
      );
    }
  }
}
