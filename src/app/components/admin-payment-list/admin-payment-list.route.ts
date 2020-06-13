import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPaymentListComponent } from './admin-payment-list.component'

const routes: Routes = [
  { path: '', component: AdminPaymentListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminPaymentListRoute {}

