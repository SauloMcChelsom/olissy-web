import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentDetailComponent } from './payment-detail.component'

const routes: Routes = [
  { path: '', component: PaymentDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PaymentDetailRoute {}

