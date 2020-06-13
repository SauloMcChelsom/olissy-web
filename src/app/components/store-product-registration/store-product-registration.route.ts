import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreProductRegistrationComponent } from './store-product-registration.component';

const routes: Routes = [
  {path:'', component: StoreProductRegistrationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StoreProductRegistrationRoute {}