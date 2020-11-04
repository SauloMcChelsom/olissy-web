
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProductsRoute } from './my-products.route';
import { MyProductsComponent } from './my-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';

@NgModule({
  imports: [
    CommonModule,
    MyProductsRoute,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [MyProductsComponent]
})

export class MyProductsModule {}
