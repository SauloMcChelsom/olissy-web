import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderSendSucessComponent } from './order-send-sucess.component';

const routes: Routes = [
  { path:'', component:  OrderSendSucessComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderSendSucessRoute {}
