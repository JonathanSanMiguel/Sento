import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators'
import { of } from 'rxjs'

import { AuthResponse, User } from '../auth/interfaces/auth.interfaces'


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient ) { }

  //EndPoint del Api REST
  private Api_Url = 'http://localhost:4000/gymkhana/auth'
  private _User?: User

  get Usuario(){
    return {...this._User}
  }

  LogIn( email: string, password: string ){

    const Url = `${this.Api_Url}/login`
    const Body = { email, password }

    //Retorna el URL y body de tipo AuthResponse.
    return this.http.post<AuthResponse>(Url, Body).pipe(
      tap(resp => {
        if(resp.ok){
          this._User = {
            uid: resp.uid,
            nombre: resp.nombre,
            apellido: resp.apellido,
          }
        }
      }),
      //Si sale bien retorna la res.
      map(resp => resp.ok),
      //Si hay error retorna el mensaje de error.
      catchError(err => of(err.error.msg))
    )
  }//LogIn

}
