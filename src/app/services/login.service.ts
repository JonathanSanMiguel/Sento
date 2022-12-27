import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators'
import { of, Observable } from 'rxjs';

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

  //Metodo de Log In
  LogIn( email: string, password: string ){

    const Url = `${this.Api_Url}/login`
    const Body = { email, password }

    //Retorna el URL y body de tipo AuthResponse.
    return this.http.post<AuthResponse>(Url, Body).pipe(

      tap(resp => {


        if(resp.ok){
          localStorage.setItem('JWToken', resp.JWtoken)

          this._User = {
            uid: resp.uid,
            nombre: resp.nombre,
            apellido: resp.apellido,
          }
          console.log(resp.uid)
          console.log(resp.nombre);
        }


      }),
      //Si sale bien retorna la res.
      map(resp => resp.ok),
      //Si hay error retorna el mensaje de error.
      catchError(err => of(err.error.msg))
    )
  }//LogIn

  
  //Metodo que valida el JsonWebToken
  ValidarJWToken(): Observable<boolean>{

    const Url = `${this.Api_Url}/renew`

    const headers = new HttpHeaders()
      .set('X-Token', localStorage.getItem('JWToken') || '')

    return this.http.get<AuthResponse>(Url, { headers }).pipe(
      map(resp => {


        if(resp.ok){
          localStorage.setItem('JWToken', resp.JWtoken)

          this._User = {
            uid: resp.uid,
            nombre: resp.nombre,
            apellido: resp.apellido,
          }
        }

        console.log('2' + resp.uid)
        console.log('2' + resp.nombre);
        return resp.ok
      }),
      //of sirve para retornar siempre false +
      //porque siempre que marque error devera hacerlo.
      catchError(err => of(false))
    )
  }


}
