import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  constructor( private fb: FormBuilder ) {}

  //Validar los campos del signin sean correctos
  miFormularioSignin: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(25)]],
    apellido: ['', [Validators.required, Validators.maxLength(25)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  Signin(){
    console.log(this.miFormularioSignin.value)
    console.log(this.miFormularioSignin.valid)
  }

}
