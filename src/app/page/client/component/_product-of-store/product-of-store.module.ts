
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductOfStoreRoute } from './product-of-store.route';
import { ProductOfStoreComponent } from './product-of-store.component';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';

@NgModule({
  imports: [
    CommonModule,
    ProductOfStoreRoute,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [ProductOfStoreComponent]
})

export class ProductOfStoreModule {}
