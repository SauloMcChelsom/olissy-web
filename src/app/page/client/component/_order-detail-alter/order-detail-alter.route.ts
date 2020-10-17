import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderDetailAlterComponent } from './order-detail-alter.component';

const routes: Routes = [
  {path: '', component: OrderDetailAlterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrderDetailAlterRoute {}