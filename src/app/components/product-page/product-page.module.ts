import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageRoute } from './product-page.route';
import { ProductPageComponent } from './product-page.component';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ModalUserNotLoggedComponent } from '../../components/modal-user-not-logged/modal-user-not-logged.component';

@NgModule({
  imports: [
    CommonModule,
    ProductPageRoute,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [ProductPageComponent, ModalUserNotLoggedComponent]
})

export class ProductPageModule { }