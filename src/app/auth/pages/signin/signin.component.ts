import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent {
  //Inyeccion de los servicios.
  constructor( private fb: FormBuilder, private router: Router, private authService: LoginService ) {}

  //Validar los campos del signin sean correctos.
  miFormularioSignin: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(25)]],
    apellido: ['', [Validators.required, Validators.maxLength(25)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  //Metodo que se acciona cuando se presiona el boton Submit.
  Signin(){
    
    const {nombre, apellido, email, password} =  this.miFormularioSignin.value

    this.authService.SigIn(nombre, apellido, email, password)
      .subscribe(res => {
        if (res === true){
          //Navega a la pagina dashboard.
          this.router.navigateByUrl('/dashboard')
        }else{
          Swal.fire('Error', res, 'error')
        }
      })
  }


}
