import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  template: '',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const userData = this.authService.getUserData();
    if (userData) {
      if (userData.tipo === 'trabajador') {
        window.location.href = '/trabajador-dashboard';
      } else if (userData.tipo === 'empleador') {
        window.location.href = '/empleador-dashboard';
      }
    } else {
      window.location.href = '/login';
    }
  }
}
