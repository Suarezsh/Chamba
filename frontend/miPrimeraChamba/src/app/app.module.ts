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
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PanelInfoComponent } from './components/panel-info/panel-info.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component'; 

const routes: Routes = [
  { path: 'registrarse', component: RegistrarseComponent },
  { path: 'iniciar-sesion', component: IniciarSesionComponent },
  { path: 'dashboard', component: DashboardComponent }, 
  { path: '', component: MainComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrarseComponent,
    IniciarSesionComponent,
    DashboardComponent,
    TrabajadorComponent,
    EmpleadorComponent,
    MainComponent,
    FooterComponent,
    NavBarComponent,
    PanelInfoComponent,
    SearchBarComponent
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
