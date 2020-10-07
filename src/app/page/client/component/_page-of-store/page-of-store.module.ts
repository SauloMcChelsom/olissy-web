
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageOfStoreRoute } from './page-of-store.route';
import { PageOfStoreComponent } from './page-of-store.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductOfStoreComponent } from '../_product-of-store/product-of-store.component';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';

@NgModule({
  imports: [
    CommonModule,
    PageOfStoreRoute,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [
    PageOfStoreComponent, 
    ProductOfStoreComponent
  ]
})

export class PageOfStoreModule {}
