import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  nombre: string = '';
  apellido: string = '';
  tipo: string = '';

  constructor(private authService: AuthService, private cookieService: CookieService) {}

  ngOnInit(): void {
    const userId = this.cookieService.get('userId');
    if (userId) {
      this.authService.obtenerUsuario(+userId).subscribe(
        (response: any) => {
          this.nombre = response.nombre;
          this.apellido = response.apellido;
          this.tipo = response.tipo;
          // Guardar los datos en las cookies
          this.cookieService.set('nombre', this.nombre);
          this.cookieService.set('apellido', this.apellido);
          this.cookieService.set('tipo', this.tipo);
        },
        (error: any) => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
    }
  }
}
