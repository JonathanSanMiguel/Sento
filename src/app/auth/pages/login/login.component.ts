import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LoginService } from 'src/app/services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //Inyeccion de los servicios
  constructor( private fb: FormBuilder, private router: Router, private authService: LoginService ) { }

  //Validar que los campos del login sean correctos
  miFormularioLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  //Metodo que se acciona al presionar el boton Submit
  Login(){
    //Destructuro los valores de email y password del objeto
    const { email, password } = this.miFormularioLogin.value

    //Manod los valores al metodo del servicio
    this.authService.LogIn(email, password)
      .subscribe(resp => {
        console.log(resp)
      })

    //Navega a la pagina dashboard
    //this.router.navigateByUrl('/dashboard')
  }


}
