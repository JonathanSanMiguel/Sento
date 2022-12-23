import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'main', component: MainComponent },
  { path: '**', redirectTo: 'login' }  

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
