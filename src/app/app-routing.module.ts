import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarJwtGuard } from './guards/validar-jwt.guard';

const routes: Routes = [
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(a => a.AuthModule)
  },
  {
    path: 'dashboard', loadChildren: () => import('./protected/protected.module').then(d => d.ProtectedModule),
    // Valida con el guard la momento de entrar en la ruta.
    canActivate: [ ValidarJwtGuard ],
    canLoad: [ ValidarJwtGuard ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
