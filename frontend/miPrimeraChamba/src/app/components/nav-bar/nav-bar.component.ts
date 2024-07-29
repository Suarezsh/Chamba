import { Component } from '@angular/core';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  registered: boolean = false;
  username: string = "usuario";
  constructor() {
    // Aquí puedes obtener el estado real de autenticación del usuario.
    // Por ejemplo, podrías obtenerlo desde un servicio de autenticación.
    // this.isLoggedIn = authService.isLoggedIn();
  }

  logout() {
    // Lógica para cerrar sesión
    this.registered = false;
    // authService.logout();
  }

  isRegistered(): boolean {
    return this.registered;
  }

  register() {
    window.location.href = "/registrarse";
  }
  
  login() {
    window.location.href = "/iniciar-sesion";
  }
}
