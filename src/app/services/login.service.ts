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
  private _User!: User


  get Usuario(){
    return {...this._User}
  }


  LogIn( email: string, password: string ){

    const Url = `${this.Api_Url}/login`
    const Body = { email, password }

    //Retorna el URL y body de tipo AuthResponse.
    return this.http.post<AuthResponse>(Url, Body).pipe(

      tap(resp => {
        if(resp.ok) localStorage.setItem('JWToken', resp.JWtoken)
      }),

      //Si sale bien retorna la res.ok
      map(resp => resp.ok),

      //Si ocurre un error, retorna el mensaje de error
      catchError(err => of(err.error.msg))
    )//return
  }//LogIn


  SigIn(nombre: string, apellido: string, email: string, password: string){
    
    const Url = `${this.Api_Url}/newUser`
    const Body = { nombre, apellido, email, password }

    // Retorna el Url y Body, que son de tipo AuthResponse
    return this.http.post<AuthResponse>(Url, Body).pipe(

      tap(resp => {
        //Si la resp.ok es true guarda los datos en un JsonWebToken
        if (resp.ok) localStorage.setItem('JWToken', resp.JWtoken)
      }),

      //Si sale bien retorna la res.ok
      map(resp => resp.ok),

      //Si ocurre un error, retorna el mensaje de error
      catchError(err => of(err.error.msg))
    )//return
  }//Sign

  
  //Metodo que valida el JsonWebToken
  ValidarJWToken(): Observable<boolean>{

    const Url = `${this.Api_Url}/renew`

    const headers = new HttpHeaders()
      .set('X-Token', localStorage.getItem('JWToken') || '')

    return this.http.get<AuthResponse>(Url, { headers }).pipe(
      map(resp => {

        localStorage.setItem('JWToken', resp.JWtoken)

        this._User = {
          uid: resp.uid,
          email: resp.email,
          nombre: resp.nombre,
          apellido: resp.apellido
        }

        return resp.ok
      }),
      //of sirve para retornar siempre false +
      //porque siempre que marque error devera hacerlo.
      catchError(err => of(false))
    )//return
  }//ValidarJWToken


  LogOut(){
    localStorage.removeItem('JWToken')
  }

}
