import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreProductComponent } from '../../components/store-product/store-product.component';
import { StoreCommentComponent } from '../../components/store-comment/store-comment.component';
import { StorePageComponent } from './store-page.component';

const routes: Routes = [
  {path:'', component: StorePageComponent,
    children:[
      {path:'', redirectTo:'store-product', pathMatch:'full'},
      {path:'store-product', component: StoreProductComponent},
      {path:'store-comment', component: StoreCommentComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StorePageRoute {}