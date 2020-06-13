import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreUserChangeRegistrationComponent } from './store-user-change-registration.component';

const routes: Routes = [
  { path: '', component: StoreUserChangeRegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StoreUserChangeRegistrationRoute {}
