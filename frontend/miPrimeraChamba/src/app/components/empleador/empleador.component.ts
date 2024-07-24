import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-empleador',
  templateUrl: './empleador.component.html',
  styleUrls: ['./empleador.component.css']
})
export class EmpleadorComponent implements OnInit {
  titulo: string = '';
  descripcion: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  chambas: any[] = [];
  mensaje: string = '';
  trabajadores: any[] = [];

  constructor(private authService: AuthService, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.obtenerChambas();
    this.listarTrabajadores();
  }

  crearChamba(): void {
    const empleadorId = this.cookieService.get('userId');
    if (empleadorId) {
      const nuevaChamba = {
        empleador_id: empleadorId,
        titulo: this.titulo,
        descripcion: this.descripcion,
        fecha_inicio: this.fechaInicio,
        fecha_fin: this.fechaFin
      };
      this.authService.crearChamba(nuevaChamba).subscribe(
        (response: any) => {
          this.limpiarFormulario();
          this.obtenerChambas();
        },
        (error: any) => {
          console.error('Error al crear la chamba:', error);
        }
      );
    } else {
      console.error('Empleador no identificado');
    }
  }

  obtenerChambas(): void {
    const empleadorId = this.cookieService.get('userId');
    if (empleadorId) {
      this.authService.obtenerChambas(empleadorId).subscribe(
        (response: any) => {
          this.chambas = response;
        },
        (error: any) => {
          console.error('Error al obtener las chambas:', error);
        }
      );
    } else {
      console.error('Empleador no identificado');
    }
  }

  eliminarChamba(chambaId: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta chamba?')) {
      this.authService.eliminarChamba(chambaId).subscribe(
        (response: any) => {
          this.obtenerChambas();
        },
        (error: any) => {
          console.error('Error al eliminar la chamba:', error);
        }
      );
    }
  }

  limpiarFormulario(): void {
    this.titulo = '';
    this.descripcion = '';
    this.fechaInicio = '';
    this.fechaFin = '';
  }

  enviarMensaje(destinatarioId: number): void {
    const remitenteId = this.cookieService.get('userId');
    if (remitenteId && destinatarioId && this.mensaje) {
      const nuevoMensaje = {
        remitente: remitenteId,
        destinatario: destinatarioId,
        mensaje: this.mensaje
      };
      this.authService.enviarMensaje(nuevoMensaje).subscribe(
        (response: any) => {
          this.limpiarFormularioMensaje();
          this.obtenerMensajes(destinatarioId);
        },
        (error: any) => {
          console.error('Error al enviar el mensaje:', error);
        }
      );
    } else {
      console.error('Datos incompletos para enviar el mensaje');
    }
  }

  obtenerMensajes(usuarioId: number): void {
    this.authService.listarMensajes(usuarioId).subscribe(
      (response: any) => {
        const trabajador = this.trabajadores.find(t => t.usuario_id === usuarioId);
        if (trabajador) {
          trabajador.mensajes = response;
        }
      },
      (error: any) => {
        console.error('Error al obtener los mensajes:', error);
      }
    );
  }

  limpiarFormularioMensaje(): void {
    this.mensaje = '';
  }

  listarTrabajadores(): void {
    this.authService.listarTrabajadores().subscribe(
      (response: any) => {
        this.trabajadores = response.map((trabajador: any) => ({
          ...trabajador,
          mensajes: { mensajes_enviados: [], mensajes_recibidos: [] }
        }));
      },
      (error: any) => {
        console.error('Error al listar los trabajadores:', error);
      }
    );
  }
}
