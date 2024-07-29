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
  }

  logout() {
    this.registered = false;
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