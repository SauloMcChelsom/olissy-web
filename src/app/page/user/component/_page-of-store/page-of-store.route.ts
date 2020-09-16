import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageOfStoreComponent } from './page-of-store.component';
import { ProductOfStoreComponent } from '../_product-of-store/product-of-store.component';

const routes: Routes = [
  {path: '', component: PageOfStoreComponent,
    children:[
      {path:'', redirectTo:'product-of-store', pathMatch:'full'},
      {path:'product-of-store', component: ProductOfStoreComponent},
      {path:'about-of-store', component: ProductOfStoreComponent},
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PageOfStoreRoute {}