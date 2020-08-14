import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const ROUTES: Routes = [

  {
    path: '',
    loadChildren: () => import('./page/user/component/login/login.module').then(m => m.LoginModule) 
  },
  {
    path: 'login',
    loadChildren: () => import('./page/user/component/login/login.module').then(m => m.LoginModule) 
  },
  {
    path: 'register',
    loadChildren: () => import('./page/user/component/register/register.module').then(m => m.RegisterModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoute {}
