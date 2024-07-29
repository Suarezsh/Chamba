import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent {
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  password: string = '';
  tipo: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) {}

  registrarse(form: NgForm) {
    if (form.valid) {
      const user = {
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.email,
        password: this.password,
        tipo: this.tipo
      };
      
      this.authService.registro(user).subscribe(
        (response: any) => {
          this.cookieService.set('userId', response.id);
          alert("Registro exitoso");
          this.router.navigate(['/iniciar-sesion']);
        },
        (error: any) => {
          this.errorMessage = error.error;
        }
      );
    }
  }
}
