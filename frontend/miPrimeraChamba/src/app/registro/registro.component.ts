
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  @ViewChild('nombre') nombreInput!: ElementRef;
  @ViewChild('apellido') apellidoInput!: ElementRef;
  @ViewChild('dni') dniInput!: ElementRef;
  @ViewChild('email') emailInput!: ElementRef;
  @ViewChild('password') passwordInput!: ElementRef;
  @ViewChild('tipo') tipoInput!: ElementRef;
  @ViewChild('ubicacion') ubicacionInput!: ElementRef;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      tipo: ['', Validators.required],
      ubicacion: ['', Validators.required]
    });
  }

  focusNext(nextField: string): void {
    switch (nextField) {
      case 'apellido':
        this.apellidoInput.nativeElement.focus();
        break;
      case 'dni':
        this.dniInput.nativeElement.focus();
        break;
      case 'email':
        this.emailInput.nativeElement.focus();
        break;
      case 'password':
        this.passwordInput.nativeElement.focus();
        break;
      case 'tipo':
        this.tipoInput.nativeElement.focus();
        break;
      case 'ubicacion':
        this.ubicacionInput.nativeElement.focus();
        break;
    }
  }

  submitForm(): void {
    if (this.registroForm.valid) {
      this.authService.register(this.registroForm.value).subscribe(
        (response: any) => {
          this.successMessage = "Registro exitoso";
          this.errorMessage = '';
        },
        (error: any) => {
          this.errorMessage = 'Registro fallido: ' + (error.error.email ? error.error.email[0] : 'Error desconocido');
          this.successMessage = '';
        }
      );
    }
  }

  onSubmit(): void {
    this.submitForm();
  }
}
