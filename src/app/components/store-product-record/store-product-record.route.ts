import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreProductRecordComponent } from './store-product-record.component';

const routes: Routes = [
  {path:'', component: StoreProductRecordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StoreProductRecordRoute {}