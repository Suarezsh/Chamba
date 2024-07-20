import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-trabajador-dashboard',
  templateUrl: './trabajador-dashboard.component.html',
  styleUrls: ['./trabajador-dashboard.component.css']
})
export class TrabajadorDashboardComponent implements OnInit {
  userData: any;
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getUserData();
    if (user) {
      this.authService.getUserInfo(user.user_id).subscribe({
        next: (response) => {
          this.userData = response;
        },
        error: (error) => {
          console.error('Failed to fetch user data', error);
          this.errorMessage = 'No se pudo obtener los datos del usuario.';
        }
      });
    } else {
      this.errorMessage = 'No hay datos de usuario disponibles.';
    }
  }
}
