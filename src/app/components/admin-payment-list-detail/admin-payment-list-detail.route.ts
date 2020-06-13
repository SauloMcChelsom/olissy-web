import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPaymentListDetailComponent } from './admin-payment-list-detail.component'

const routes: Routes = [
  { path: '', component: AdminPaymentListDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminPaymentListDetailRoute {}

