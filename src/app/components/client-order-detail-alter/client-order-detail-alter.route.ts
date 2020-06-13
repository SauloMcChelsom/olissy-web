import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientOrderDetailAlterComponent } from './client-order-detail-alter.component'

const routes: Routes = [
  { path: '', component: ClientOrderDetailAlterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ClientOrderDetailAlterRoute {}

