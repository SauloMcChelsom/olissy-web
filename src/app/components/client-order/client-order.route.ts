import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientOrderComponent } from './client-order.component';

const routes: Routes = [
  { path:'', component: ClientOrderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientOrderRoute {}
