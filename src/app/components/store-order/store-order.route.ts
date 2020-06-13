import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreOrderComponent } from './store-order.component';

const routes: Routes = [
  {path:'', component: StoreOrderComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StoreOrderModuleRoute {}