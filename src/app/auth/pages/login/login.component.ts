import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import Swal from 'sweetalert2'

import { LoginService } from 'src/app/services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Inyeccion de los servicios
  constructor( private fb: FormBuilder, private router: Router, private authService: LoginService ) { }

  // Validar que los campos del login sean correctos
  miFormularioLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  // Metodo que se acciona al presionar el boton Submit
  Login(){
    // Destructura los valores de email y password del objeto.
    const { email, password } = this.miFormularioLogin.value

    // Manda los valores al metodo del servicio
    this.authService.LogIn(email, password)
      .subscribe(res => {
        // Navega a la pagina dashboard
        if(res === 'true') {
          this.router.navigateByUrl('/dashboard')
        }else{
          // Swal manda un mensaje modal de error
          Swal.fire('Error', res, 'error')
        }
      })
  }//Login


}
