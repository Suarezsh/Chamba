import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css']
})
export class TrabajadorComponent implements OnInit {
  habilidades: string = '';
  disponible: boolean = false;
  mensaje: string = '';
  chambas: any[] = [];
  chambasFiltradas: any[] = [];
  busqueda: string = '';
  mensajes: any = {};
  empleadores: Set<number> = new Set<number>();
  empleadoresInfo: any = {}; 

  constructor(private authService: AuthService, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.obtenerDatosTrabajador();
    this.listarChambas();
  }

  obtenerDatosTrabajador(): void {
    const trabajadorId = this.cookieService.get('userId');
    if (trabajadorId) {
      this.authService.obtenerTrabajador(parseInt(trabajadorId)).subscribe(
        (response: any) => {
          this.habilidades = response.habilidades;
          this.disponible = response.disponible;
        },
        (error: any) => {
          console.error('Error al obtener los datos del trabajador:', error);
        }
      );
    } else {
      console.error('ID del trabajador no encontrado en las cookies');
    }
  }

  actualizarDatosTrabajador(): void {
    const trabajadorId = this.cookieService.get('userId');
    if (trabajadorId) {
      const datosActualizados = {
        habilidades: this.habilidades,
        disponible: this.disponible
      };
      this.authService.actualizarTrabajador(parseInt(trabajadorId), datosActualizados).subscribe(
        (response: any) => {
          alert('Datos actualizados correctamente');
          this.obtenerDatosTrabajador();
        },
        (error: any) => {
          console.error('Error al actualizar los datos del trabajador:', error);
        }
      );
    } else {
      console.error('ID del trabajador no encontrado en las cookies');
    }
  }

  listarChambas(): void {
    this.authService.listarChambas().subscribe(
      (response: any) => {
        this.chambas = response;
        this.chambasFiltradas = response; 
        this.chambas.forEach(chamba => {
          this.empleadores.add(chamba.empleador_usuario_id);
          this.empleadoresInfo[chamba.empleador_usuario_id] = {
            nombre: chamba.empleador_nombre,
            apellido: chamba.empleador_apellido
          };
        });
        this.empleadores.forEach(empleadorId => {
          if (empleadorId) {
            this.obtenerMensajes(empleadorId);
          } else {
            console.error('El ID del empleador no es válido');
          }
        });
      },
      (error: any) => {
        console.error('Error al obtener las chambas:', error);
      }
    );
  }

  filtrarChambas(): void {
    const busquedaLower = this.busqueda.toLowerCase();
    this.chambasFiltradas = this.chambas.filter(chamba => 
      chamba.titulo.toLowerCase().includes(busquedaLower) ||
      chamba.descripcion.toLowerCase().includes(busquedaLower) ||
      (chamba.empleador_nombre && chamba.empleador_nombre.toLowerCase().includes(busquedaLower)) ||
      (chamba.empleador_apellido && chamba.empleador_apellido.toLowerCase().includes(busquedaLower)) ||
      chamba.fecha_inicio.toLowerCase().includes(busquedaLower) ||
      chamba.fecha_fin.toLowerCase().includes(busquedaLower)
    );
  }

  obtenerMensajes(empleadorId: number): void {
    if (empleadorId) {
      this.authService.listarMensajes(empleadorId).subscribe(
        (response: any) => {
          this.mensajes[empleadorId] = response;
        },
        (error: any) => {
          console.error(`Error al obtener los mensajes para el empleador con ID: ${empleadorId}`, error);
        }
      );
    } else {
      console.error('El ID del empleador no es válido');
    }
  }

  enviarMensaje(empleadorId: number): void {
    if (this.mensaje.trim() !== '') {
      const trabajadorId = this.cookieService.get('userId');
      if (trabajadorId) {
        const nuevoMensaje = {
          remitente: trabajadorId,
          destinatario: empleadorId,
          mensaje: this.mensaje
        };
        this.authService.enviarMensaje(nuevoMensaje).subscribe(
          (response: any) => {
            this.mensaje = ''; 
            this.obtenerMensajes(empleadorId); 
          },
          (error: any) => {
            console.error('Error al enviar el mensaje:', error);
          }
        );
      } else {
        console.error('ID del trabajador no encontrado en las cookies');
      }
    }
  }
}
