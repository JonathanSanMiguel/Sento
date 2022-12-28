import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor( private router: Router, private authService: LoginService ) { }

  //Get para traer los datos del usuario que inicio sesion
  get User(){
    return this.authService.Usuario
  }

  Logout(){
    this.router.navigateByUrl('/auth/login')
    this.authService.LogOut()
  }

}
