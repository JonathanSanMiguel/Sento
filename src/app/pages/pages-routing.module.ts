import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
/*     component: MainComponent, */
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signin', component: SigninComponent },
      { path: 'main', component: MainComponent },
      { path: '**', redirectTo: 'login'}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
