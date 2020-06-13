import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientUserChangeRegistrationComponent } from './client-user-change-registration.component';

const routes: Routes = [
  { path:'', component: ClientUserChangeRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ClientUserChangeRegistrationRoute {}