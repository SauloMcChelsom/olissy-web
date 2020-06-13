import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCrudDatabaseComponent } from './product-crud-database.component';

const routes: Routes = [
  {path: '', component: ProductCrudDatabaseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductCrudDatabaseRoute {}