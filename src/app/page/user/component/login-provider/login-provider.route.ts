import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginProviderComponent } from './login-provider.component';

const routes: Routes = [
  {path: '', component: LoginProviderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LoginProviderRoute {}