
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductOfStoreRoute } from './product-of-store.route';
import { ProductOfStoreComponent } from './product-of-store.component';

@NgModule({
  imports: [
    CommonModule,
    ProductOfStoreRoute
  ],
  declarations: [ProductOfStoreComponent]
})

export class ProductOfStoreModule {}
