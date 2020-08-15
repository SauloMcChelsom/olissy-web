import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProhibitedProductsComponent } from './prohibited-products.component'
import { ProhibitedProductsRoute } from './prohibited-products.route'

@NgModule({
  declarations: [ProhibitedProductsComponent],
  imports: [
    CommonModule,
    ProhibitedProductsRoute
  ]
})
export class ProhibitedProductsModule { }
