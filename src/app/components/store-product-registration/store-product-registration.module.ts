import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreProductRegistrationRoute } from './store-product-registration.route';
import { StoreProductRegistrationComponent } from './store-product-registration.component';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';

@NgModule({
  imports: [
    CommonModule,
    StoreProductRegistrationRoute,
    FormsModule,
    ReactiveFormsModule,
    IMaskModule,
    NgxMaskModule
  ],
  declarations: [
    StoreProductRegistrationComponent
  ]
})

export class StoreProductRegistrationModule { }

