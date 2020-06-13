import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompleteOrdersComponent } from './complete-orders.component';

const routes: Routes = [
  {path:'', component: CompleteOrdersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompleteOrdersRoute {}