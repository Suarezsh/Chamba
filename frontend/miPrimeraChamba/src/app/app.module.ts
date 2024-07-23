import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TrabajadorComponent } from './components/trabajador/trabajador.component';
import { EmpleadorComponent } from './components/empleador/empleador.component'; 

const routes: Routes = [
  { path: 'registrarse', component: RegistrarseComponent },
  { path: 'iniciar-sesion', component: IniciarSesionComponent },
  { path: 'dashboard', component: DashboardComponent }, 
  { path: '', redirectTo: '/iniciar-sesion', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrarseComponent,
    IniciarSesionComponent,
    DashboardComponent,
    TrabajadorComponent,
    EmpleadorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
