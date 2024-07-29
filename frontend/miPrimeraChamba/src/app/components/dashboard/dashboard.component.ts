import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  nombre: string = '';
  apellido: string = '';
  tipo: string = '';

  editNombre: string = '';
  editApellido: string = '';
  editEmail: string = '';
  editPassword: string = '';

  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) {}

  ngOnInit(): void {
    const userId = this.cookieService.get('userId');
    if (userId) {
      this.authService.obtenerUsuario(+userId).subscribe(
        (response: any) => {
          this.nombre = response.nombre;
          this.apellido = response.apellido;
          this.tipo = response.tipo;

          this.editNombre = this.nombre;
          this.editApellido = this.apellido;
          this.editEmail = response.email;
        },
        (error: any) => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
    }
  }

  editarUsuario(form: NgForm): void {
    if (form.invalid) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    const userId = this.cookieService.get('userId');
    if (userId) {
      const datos = {
        id: +userId,
        nombre: this.editNombre,
        apellido: this.editApellido,
        email: this.editEmail,
        password: this.editPassword || null
      };

      this.authService.editarUsuario(datos).subscribe(
        (response: any) => {
          this.nombre = response.nombre;
          this.apellido = response.apellido;

          this.cookieService.set('nombre', this.nombre);
          this.cookieService.set('apellido', this.apellido);
          this.cookieService.set('email', this.editEmail);

          this.editPassword = '';
          alert('Datos del usuario actualizados con éxito.');
        },
        (error: any) => {
          console.error('Error al actualizar los datos del usuario:', error);
          alert('Error al actualizar los datos del usuario. Por favor, inténtalo de nuevo.');
        }
      );
    }
  }

  cerrarSesion(): void {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.cookieService.deleteAll();
      this.router.navigate(['/iniciar-sesion']);
    }
  }

  generarPDF(): void {
    const userId = this.cookieService.get('userId');
    if (userId) {
      this.authService.generarPDF(+userId).subscribe(
        (response) => {
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          window.open(url);
        },
        (error: any) => {
          console.error('Error al generar el PDF:', error);
        }
      );
    }
  }
}
