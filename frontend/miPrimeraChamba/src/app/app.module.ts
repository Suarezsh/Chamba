import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; 
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TrabajadorComponent } from './components/trabajador/trabajador.component';
import { EmpleadorComponent } from './components/empleador/empleador.component';
import { MainComponent } from './components/main/main.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PanelInfoComponent } from './components/panel-info/panel-info.component'; 

@NgModule({
  declarations: [
    AppComponent,
    RegistrarseComponent,
    IniciarSesionComponent,
    DashboardComponent,
    TrabajadorComponent,
    EmpleadorComponent,
    MainComponent,
    NavBarComponent,
    PanelInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule  // Usa AppRoutingModule aquí
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
