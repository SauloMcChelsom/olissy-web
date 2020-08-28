import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const ROUTES: Routes = [

  {
    path: '',
    loadChildren: () => import('./page/user/component/login-provider/login-provider.module').then(m => m.LoginProviderModule) 
  },
  {
    path: 'login',
    loadChildren: () => import('./page/user/component/login-provider/login-provider.module').then(m => m.LoginProviderModule) 
  },
  {
    path: 'home',
    loadChildren: () => import('./page/user/component/_home/home.module').then(m => m.HomeModule) 
  },
  {
    path: 'loginTest',
    loadChildren: () => import('./page/user/component/login/login.module').then(m => m.LoginModule) 
  },
  {
    path: 'registerTest',
    loadChildren: () => import('./page/user/component/register/register.module').then(m => m.RegisterModule) 
  },
  {
    path: 'warehouse',
    loadChildren: () => import('./page/admin/component/warehouse/warehouse.module').then(m => m.WarehouseModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoute {}
