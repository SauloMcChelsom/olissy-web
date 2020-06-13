import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProhibitedProductsComponent } from './prohibited-products.component'

const routes: Routes = [
  { path: '', component: ProhibitedProductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProhibitedProductsRoute {} 