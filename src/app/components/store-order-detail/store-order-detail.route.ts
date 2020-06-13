import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreOrderDetailComponent } from './store-order-detail.component'

const routes: Routes = [
  { path: '', component: StoreOrderDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StoreOrderDetailRoute {}

