import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { AuthResponse } from '../auth/interfaces/auth.interfaces'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient ) { }

  //Url base del Api REST
  Api_Url = 'http://localhost:4000/gymkhana/auth'

  LogIn( email: string, password: string ){

    const Url = `${this.Api_Url}/login`
    const Body = { email, password }

    //Retorna el URL y body de tipo AuthResponse
    return this.http.post<AuthResponse>(Url, Body)
  }//LogIn

}
