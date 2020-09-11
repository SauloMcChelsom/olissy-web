import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductOfStoreComponent } from './product-of-store.component';

const routes: Routes = [
  {path: '', component: ProductOfStoreComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductOfStoreRoute {}