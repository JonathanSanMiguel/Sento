import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //Inyeccion de los servicios
  constructor( private fb: FormBuilder, private router: Router ) { }

  //Validar que los campos del login sean correctos
  miFormularioLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  //Metodo que se acciona al presionar el boton Submit
  Login(){
    console.log(this.miFormularioLogin.value)
    //Navega a la pagina dashboard
    this.router.navigateByUrl('/dashboard')
  }


}
