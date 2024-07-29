import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-panel-info',
  templateUrl: './panel-info.component.html',
  styleUrls: ['./panel-info.component.css']
})
export class PanelInfoComponent implements OnInit {
  @Input() imageUrl: string = '/../../logo1.png';  

  chambas: number = 0;
  trabajadores: number = 0;
  empleadores: number = 0;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.obtenerEstadisticas().subscribe(data => {
      this.chambas = data.cantidad_chambas;
      this.trabajadores = data.cantidad_trabajadores;
      this.empleadores = data.cantidad_empleadores;
    });
  }
}
