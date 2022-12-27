import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { LoginService } from '../services/login.service';


@Injectable({
  providedIn: 'root'
})
export class ValidarJwtGuard implements CanActivate, CanLoad {

  //Inyeccion de los servicios.
  constructor( private authService: LoginService, private router: Router ){}

  canActivate(): Observable<boolean> | boolean {
    // Si el JsonWebToken no es valido, redireccionara al login.
    return this.authService.ValidarJWToken().pipe(
      tap( valid => {
        if (!valid) this.router.navigateByUrl('/auth/login')
      })
    )
  }

  canLoad(): Observable<boolean> | boolean {
    // Si el JsonWebToken no es valido, redireccionara al login.
    return this.authService.ValidarJWToken().pipe(
      tap( valid => {
        if (!valid) this.router.navigateByUrl('/auth/login')
      })
    )
  }
  

}
